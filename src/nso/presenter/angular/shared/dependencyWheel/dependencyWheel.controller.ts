//

import {
  IAugmentedJQuery,
  IController,
  IOnChangesObject,
} from "angular";
import * as d3 from "d3";

import {
  IData,
  ILinkDatum,
  INode,
  INodeDatum,
} from "nso/models";

import { IRawData } from "./dependencyWheel.mocks";
//

const INNER_RADIUS_RATIO: number = 0.875;
const BUNDLE_STRENGTH_RATIO: number = 0.95;
const DIAMETER: number = Math.min(window.innerHeight, window.innerWidth) * INNER_RADIUS_RATIO;
export class DependencyWheelController implements IController {

  public vertex: IData;
  private diameter = DIAMETER;
  private radius = this.diameter / 2;
  private innerRadius = this.radius * INNER_RADIUS_RATIO;
  private cluster = d3.cluster<IHierarchicalNode>()
    .size([360, this.innerRadius]);
  private line = d3.radialLine<any>()
    .radius((d) => d.y)
    .angle((d) => d.x / 180 * Math.PI)
    .curve(d3.curveBundle.beta(BUNDLE_STRENGTH_RATIO));

  private svgElement: Element;
  private link = d3.select(this.svgElement)
    .append("g")
    .selectAll(".link");

  private node = d3.select(this.svgElement)
    .append("g")
    .selectAll(".node");

  //

  constructor(
    private $element: IAugmentedJQuery,
  ) {
    "ngInject";
  }

  //

  public $onChanges(onChangesObj: IOnChangesObject) {
    if (!this.cluster) {
      // No cluster, No render
      return;
    }

    console.log("vertex", this.vertex);
    const remainingNodes = this.vertex.nodes.reduce((memo, {label, id}) => {
      memo[label] = -1;
      return memo;
    }, {} as {[label: string]: number});
    const findById = (id: number) => (data: {id: number}) => data.id === id;
    const add = (memo: any, node: any) => {
      const rawData: IRawData = {
        imports: [],
        name: node.label,
        size: 0,
      };

      return memo.push(rawData);
    };
    const formatedData = this.vertex.edges.reduce((memo, edge) => {

      const fromNode = this.vertex.nodes.find(findById(edge.from));
      const toNode = this.vertex.nodes.find(findById(edge.to));

      let fromNodeIndex = remainingNodes[fromNode.label];
      if (fromNodeIndex < 0) {
        fromNodeIndex = remainingNodes[fromNode.label] = add(memo, fromNode) - 1;
      }
      memo[fromNodeIndex].imports.push(toNode.label);

      const toNodeIndex = remainingNodes[toNode.label];
      if (toNodeIndex < 0) {
        remainingNodes[toNode.label] = add(memo, {label: toNode.label}) - 1;
      } else {
         // memo[toNodeIndex].imports.push(toNode.label);
      }

      return memo;
    }, [] as IRawData[]);

    console.log("formatedData", formatedData);
    console.log("remainingNodes", remainingNodes);
    // const formatedData = fetchRawDatas(); // this.packageHierarchy(this.vertex);

    const root = packageHierarchy(formatedData);

    this.cluster(root);

    const links = packageImports(root.leaves());

    this.link = this.link
      .data(links)
      .enter()
      .append("path")
      .each((d: any) => {
        d.source = d[0];
        d.target = d[d.length - 1];
      })
      .attr("class", "link")
      .attr("d", this.line);

    this.node = this.node
      // .data(nodes.filter((n) => !n.children))
    .data(root.leaves())
      .enter()
      .append("text")
      .attr("class", (d, i) => i === 0 ? "node node--origin" : "node")
      .attr("dy", ".31em")
      .attr("transform", this.transform)
      .style("text-anchor", (d: any) => d.x < 180 ? "start" : "end")
      .text((d) => d.data.key)
      .on("mouseover", this.onmouseover)
      .on("mouseout", this.onmouseout);

    d3.select(self.frameElement).style("height", this.diameter + "px");
  }

  public $postLink() {
    this.svgElement = this.$element[0].querySelector("svg");

    const stageGroup = d3.select(this.svgElement)
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .append("g")
      .attr("transform", `translate(${Math.ceil(window.innerWidth / 2)},${Math.ceil(window.innerHeight / 2)})`);

    this.link = stageGroup.append("g").selectAll(".link");
    this.node = stageGroup.append("g").selectAll(".node");

    // Manual render call
    this.$onChanges({});
  }

  private transform = (d: d3.HierarchyPointNode<any>) => {
    return"rotate(" + (d.x - 90) + ") translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : " rotate(180)");
  }

  private onmouseover = (d: any): void => {
    this.node
      .each((n: any) => { n.target = n.source = false; });

    this.link
      .classed("link--target", (l: any) => { if (l.target === d) { return l.source.source = true; } })
      .classed("link--source", (l: any) => { if (l.source === d) { return l.target.target = true; } });

    this.node
      .classed("node--target", (n: any) => n.target)
      .classed("node--source", (n: any) => n.source);
  }

  private onmouseout = (d: any): void => {
    this.link
      .classed("link--target", false)
      .classed("link--source", false);

    this.node
      .classed("node--target", false)
      .classed("node--source", false);
  }
}

interface IHierarchicalNode extends IRawData {
  children: IHierarchicalNode[];
  parent: IHierarchicalNode;
  key: string;
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes: IRawData[]) {
  const map: {[name: string]: IHierarchicalNode} = {};

  function find(name: string, data?: IHierarchicalNode) {
    let hierarchicalNode = map[name];
    let i;
    if (!hierarchicalNode) {
      hierarchicalNode = map[name] = data || {name, children: []} as IHierarchicalNode;

      if (name.length) {
        hierarchicalNode.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        hierarchicalNode.parent.children = hierarchicalNode.parent.children || [];
        hierarchicalNode.parent.children.push(hierarchicalNode);
        hierarchicalNode.key = name.substring(i + 1);
      }
    }
    return hierarchicalNode;
  }

  classes.forEach((d) => { find(d.name, d as any); });

  return d3.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes: Array<d3.HierarchyNode<IHierarchicalNode>>) {

  // Compute a map from name to node.
  const map = nodes.reduce((memo, d) => {
    memo[d.data.name] = d;
    return memo;
  }, {} as {[name: string]: typeof nodes[0]});

  // For each import, construct a link from the source to target node.
  const imports = nodes
    .filter((d) => d.data.imports)
    .map((d) => d.data.imports.map((i) => map[d.data.name].path(map[i])))
    .reduce((memo, i) => memo.concat(i), []);

  return imports;
}

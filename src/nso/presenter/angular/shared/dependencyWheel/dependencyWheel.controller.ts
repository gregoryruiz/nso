//

import {
  IAugmentedJQuery,
  IController,
  IOnChangesObject,
} from "angular";
import * as d3 from "d3";

import {
  IVertex,
} from "nso/models";
import {
  INodeColor,
  INodeDatum,
  IRawData,
} from "nso/models/d3";

//

const INNER_RADIUS_RATIO: number = 0.875;
const BUNDLE_STRENGTH_RATIO: number = 0.95;
const DIAMETER: number = Math.min(window.innerHeight, window.innerWidth) * INNER_RADIUS_RATIO;

export class DependencyWheelController implements IController {

  public vertex: IVertex;

  //

  private diameter = DIAMETER;
  private radius = this.diameter / 2;
  private innerRadius = this.radius * INNER_RADIUS_RATIO;
  private cluster = d3.cluster<INodeDatum>()
    .size([360, this.innerRadius]);
  private line = d3.radialLine<d3.HierarchyPointNode<INodeDatum>>()
    .curve(d3.curveBundle.beta(BUNDLE_STRENGTH_RATIO))
    .radius((d) => d.y)
    .angle((d) => d.x / 180 * Math.PI)
  ;
  private svgElement: Element;
  // TODO find a way to declare (ie type)
  private link = d3.select(this.svgElement)
    .append("g")
    .selectAll(".link");
  // TODO find a way to declare (ie type)
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
      return; // No cluster, No render
    }

    const remainingNodes = this.vertex.nodes.reduce((memo, { label, id }) => {
      memo[label] = -1;
      return memo;
    }, {} as { [label: string]: number });
    const findById = (id: number) => (data: { id: number }) => data.id === id;
    const add = (memo: IRawData[], name: string) => {
      return memo.push({
        imports: new Array<string>(),
        name,
        size: 0,
      });
    };
    const formatedData = this.vertex.links.reduce((memo, edge) => {

      const fromNode = this.vertex.nodes.find(findById(edge.from));
      const toNode = this.vertex.nodes.find(findById(edge.to));

      let fromNodeIndex = remainingNodes[fromNode.label];
      if (fromNodeIndex < 0) {
        fromNodeIndex = remainingNodes[fromNode.label] = add(memo, fromNode.label) - 1;
      }
      memo[fromNodeIndex].imports.push(toNode.label);

      const toNodeIndex = remainingNodes[toNode.label];
      if (toNodeIndex < 0) {
        remainingNodes[toNode.label] = add(memo, toNode.label) - 1;
      }

      return memo;
    }, [] as IRawData[]);

    const root = this.cluster(this.packageHierarchy(formatedData).sum((d) => d.size));

    const links = this.packageImports(root.leaves());

    this.link = this.link
      .data(links)
      .enter()
      .append("path")
      .each((d: any[] & d3.HierarchyPointLink<any>) => {
        d.source = d[0];
        d.target = d[d.length - 1];
      })
      .attr("class", "link")
      .attr("d", this.line);

    this.node = this.node
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("class", (d, i) => i === 0 ? "node node--origin" : "node")
      .attr("dy", ".31em")
      .attr("transform", this.transform)
      .style("text-anchor", (d) => d.x < 180 ? "start" : "end")
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

    this.link = stageGroup
      .append("g")
      .selectAll(".link");
    this.node = stageGroup
      .append("g")
      .selectAll(".node");

    // Manual render call
    this.$onChanges({});
  }

  private transform = (d: d3.HierarchyPointNode<INodeDatum>): string => {
    return "rotate(" + (d.x - 90) + ") translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : " rotate(180)");
  }

  private onmouseover = (d: d3.HierarchyPointNode<INodeDatum> & d3.HierarchyPointLink<INodeDatum>): void => {
    this.node
      .each((n: INodeColor) => n.target = n.source = false);

    this.link
      .classed("link--target", (l: d3.HierarchyPointLink<INodeDatum>) => { if (l.target === d) { return l.source.data.source = true; } })
      .classed("link--source", (l: d3.HierarchyPointLink<INodeDatum>) => { if (l.source === d) { return l.target.data.target = true; } })
      .filter((l: d3.HierarchyPointLink<INodeDatum>) => l.target === d || l.source === d)
      .raise();

    this.node
      .classed("node--target", (n: INodeColor) => n.target)
      .classed("node--source", (n: INodeColor) => n.source);
  }

  private onmouseout = (d: any): void => {
    this.link
      .classed("link--target", false)
      .classed("link--source", false);

    this.node
      .classed("node--target", false)
      .classed("node--source", false);
  }

  // Lazily construct the package hierarchy from class names.
  private packageHierarchy(classes: IRawData[]): d3.HierarchyNode<INodeDatum> {
    const map = new Map<string, INodeDatum>();

    function find(name: string, data?: INodeDatum) {
      if (!map.has(name)) {
        const newNode = {
          ...{
            children: new Array<INodeDatum>(),
            key: name,
            name,
          } as INodeDatum,
          ...data,
        };
        if (name.length) {
          newNode.parent = find("");
          newNode.parent.children.push(newNode);
        }
        map.set(name, newNode);
      }
      return map.get(name);
    }

    classes.forEach((d) => { find(d.name, d as INodeDatum); });

    return d3.hierarchy(map.get(""));
  }

  // Return a list of imports for the given array of nodes.
  private packageImports(nodes: Array<d3.HierarchyPointNode<INodeDatum>>): Array<Array<d3.HierarchyPointNode<INodeDatum>>> {

    // Compute a map from name to node.
    const map = new Map<string, d3.HierarchyPointNode<INodeDatum>>();
    nodes.forEach((n) => map.set(n.data.name, n));

    // For each import, construct a link from the source to target node.
    const imports = new Array<Array<d3.HierarchyPointNode<INodeDatum>>>();
    nodes
      .filter((d) => d.data.imports)
      .map((d) => d.data.imports.forEach((i) =>
        imports.push(map.get(d.data.name).path(map.get(i)))));

    return imports;
  }
}

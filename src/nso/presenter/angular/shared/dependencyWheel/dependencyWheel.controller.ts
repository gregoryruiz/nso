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
import {
  fetchRawDatas,
  IRawData,
} from "./dependencyWheel.mocks";
//

const INNER_RADIUS_RATIO: number = 0.875;
const BUNDLE_STRENGTH_RATIO: number = 0.95;
const DIAMETER: number = Math.min(window.innerHeight, window.innerWidth) * INNER_RADIUS_RATIO;
export class DependencyWheelController implements IController {

  public vertex: IData;
  private diameter = DIAMETER;
  private radius = this.diameter / 2;
  private innerRadius = this.radius * INNER_RADIUS_RATIO;
  private cluster = d3.cluster<INodeDatum>()
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

    const formatedData = this.packageHierarchy(this.vertex);
    const root = d3.hierarchy(formatedData, (d) => d.children);

    const nodes = root.descendants();
    const links = this.packageImports(nodes);

    this.cluster(root);

    this.link = this.link
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => this.line(d.source.path(d.target)));

    this.node = this.node
      // .data(nodes.filter((n) => !n.children))
      .data(nodes as Array<d3.HierarchyPointNode<INodeDatum>>)
      .enter()
      .append("text")
      .attr("class", "node")
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

    this.link = stageGroup.append("g").selectAll(".link");
    this.node = stageGroup.append("g").selectAll(".node");

    // Manual render call
    this.$onChanges({});
  }

  private transform = (d: d3.HierarchyPointNode<INodeDatum>) => {
    return (!d.children)
      ? "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)")
      : "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
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

  // Lazily construct the package hierarchy from raw infos.
  private packageHierarchy(vertex: IData): INodeDatum {
    const map = {};

    const distinctTos = Array.from(new Set<number>(vertex.edges.map((e) => e.to)));
    const rootNodeId = vertex.nodes.map((n) => n.id).filter((item) => !distinctTos.includes(item))[0];
    const rootNode = vertex.nodes.find((n) => n.id === rootNodeId);

    function find(node: INode): INodeDatum {
      let nodeDatum = map[node.label] as INodeDatum;

      if (!nodeDatum) {
        nodeDatum = map[node.label] = Object.assign({} as INodeDatum, { name, children: [], imports: [] });
        const parentNodeIds = Array.from(
          new Set<number>(vertex.edges
            .filter((e) => e.to === node.id)
            .map((e) => e.from)));
        if (parentNodeIds.length) {
          nodeDatum.parent = find(vertex.nodes.find((n) => n.id === parentNodeIds[0]));
          nodeDatum.parent.children.push(nodeDatum);
        }

        nodeDatum.key = nodeDatum.name = node.label;
        vertex.edges.filter((e) => e.from === node.id).forEach((e) => {
          nodeDatum.imports.push(vertex.nodes.find((n) => n.id === e.to).label);
        });
      }

      return nodeDatum;
    }

    vertex.nodes.forEach(find);

    return map[rootNode.label];
  }

  // Return a list of imports for the given array of nodes.
  private packageImports(nodes: Array<d3.HierarchyNode<INodeDatum>>): ILinkDatum[] {
    const map = {};
    const links = new Array<ILinkDatum>();

    // Compute a map from name to node.
    nodes.forEach((d) => {
      map[d.data.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach((d) => {
      if (!d.data.imports) {
        return;
      }

      d.data.imports.forEach((i) => {
        links.push({ source: map[d.data.name], target: map[i] });
      });
    });

    return links;
  }

}

//

import * as vis from "vis";
import {
  getPackageInfosAsync,
  IJspmPackageInfo,
} from "./jspmFetcher";
import defaultOptions, {
  INsoColor,
  NODE_DEFAULT_COLOR,
  NODE_FAIL_COLOR,
  NODE_LOADING_COLOR,
  NODE_ROOT_COLOR,
} from "./options";

/**
 * NsoData
 */
class NsoData implements vis.Data {
  public nodes?: vis.DataSet<INsoNode>;
  public edges?: vis.DataSet<vis.Edge>;

  constructor() {
    this.nodes = new vis.DataSet<INsoNode>();
    this.edges = new vis.DataSet<vis.Edge>();
  }
}

/**
 * INsoNode
 */
interface INsoNode extends vis.Node {
      _depth?: number;
      _dependencyCount?: number;
      _dependentCount?: number;
      mass?: number;
      color?: INsoColor;
      value?: number;
}

export default class NSOGraph {
  public network: vis.Network;
  private getScale: (node: INsoNode) => number;
  private data: NsoData;
  private labelStore: string[];
  private networkOptions: vis.Options;

  constructor(element: HTMLElement) {

    this.labelStore = [];
    this.data = new NsoData();

    this.getScale = (node) => node._dependencyCount + node._dependentCount;
    this.networkOptions = Object.assign({}, defaultOptions);
    this.network = new vis.Network(element, this.data, this.networkOptions);

    this.network.on("stabilized", () => {
      console.log("stabilized");
      this.network.fit();
    });

  }

  public setNetworkOptions(options: vis.Options) {
    this.network.setOptions(Object.assign(this.networkOptions, options));
  }

  public drawDependenciesFrom(rootModuleName) {
    const rootNode: INsoNode = {
      _dependencyCount: 0,
      _dependentCount: 0,
      _depth: 0,
      color: NODE_LOADING_COLOR,
      id: 0,
      label: rootModuleName,
      mass: 1,
    };

    this.data.nodes.add(rootNode);

    this.dependencyFetching(rootNode)
      .then(() => {
        console.log("Alllllllllllllllllllll doooooooooooooooone !", ...arguments);
        this.network.fit();
      });
  }

  public destroy() {
    this.clear();

    this.data = null;
    this.network.destroy();
    this.network = null;
  }

  private dependencyFetching(node: INsoNode) {
    const fetchingDepth = node._depth + 1;
    return Promise.resolve(node)
      .then((res) => {
        return getPackageInfosAsync(res.label);
      })
      .then((pkg) => {
        if (!this.data) {
          throw new Error("Cancel Everything Dude ! STOP !");
        }
        return pkg;
      })
      .then((pkg) => {
        return this._describeNewData(pkg.dependencies)
          .then(({
            nodes: newNodes,
            edges: newEdges,
          }) => {
            newNodes = newNodes.map((newNode) => {
              newNode._depth = fetchingDepth;
              newNode._dependentCount = 0;
              newNode._dependencyCount = 0;
              newNode.color = NODE_LOADING_COLOR;

              return newNode;
            });
            this.data.nodes.add(newNodes);
            this.data.edges.add(
              newEdges.map((edge) => {
                const depNode = this.data.nodes.get(edge.to as vis.IdType);
                console.log(depNode);
                node._dependencyCount++;
                depNode._dependentCount++;

                const nodeScale = this.getScale(node);
                node.mass = 1 + nodeScale;
                node.value = nodeScale;

                const depNodeScale = this.getScale(depNode);
                depNode.mass = 1 + depNodeScale;
                depNode.value = depNodeScale;

                this.data.nodes.update(node);
                this.data.nodes.update(depNode);

                edge.from = node.id;
                return edge;
              }),
            );
            return newNodes;
          });
      })
      .then((nodes) => {
        return Promise
          .all(nodes.map(
            ({
              id,
            }) => this.dependencyFetching(this.data.nodes.get(id)),
          ));
      })
      .then(() => {
        this.data.nodes.update({
          color: node.id === 0 ? NODE_ROOT_COLOR : NODE_DEFAULT_COLOR,
          id: node.id,
        });
      })
      .catch((e) => {
        console.warn("fetching fail\n", e);
        this.data.nodes.update({
          color: NODE_FAIL_COLOR,
          id: node.id,
        });
        return {};
      });

  }

  private _describeNewData(dependencies) {
    return Promise.resolve()
      .then(() => {
        return Object.entries(dependencies)
          .reduce((memo, [dependencyName]) => {

            let nodeId = this.labelStore.indexOf(dependencyName);

            if (nodeId < 0) {
              nodeId = this.labelStore.push(dependencyName);
              memo.nodes.push({
                id: nodeId,
                label: dependencyName,
              });
            }

            memo.edges.push({
              arrows: "to",
              to: nodeId,
            });

            return memo;
          }, {
            edges: [] as vis.EdgeOptions[],
            nodes: [] as INsoNode[],
          });
      });
  }

  private clear() {
    this.labelStore = [];
    this.data.nodes.clear();
    this.data.edges.clear();
  }
}

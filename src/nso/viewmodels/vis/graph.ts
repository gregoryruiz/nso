//

import { Network } from "vis";

import { fetchPackageInfosAsync } from "nso/dal";
import {
  INodeDatum,
  NODE_DEFAULT_COLOR,
  NODE_FAIL_COLOR,
  NODE_LOADING_COLOR,
  NODE_ROOT_COLOR,
  Vertex,
} from "nso/models/vis";
import { DEFAULT_GRAPH_OPTIONS } from "nso/viewmodels/vis";

export class Graph {
  public network: vis.Network;

  constructor(
    element: HTMLElement,
    private labelStore: string[] = [],
    private data: Vertex = new Vertex(),
    private networkOptions: vis.Options = DEFAULT_GRAPH_OPTIONS) {

    this.network = new Network(
      element,
      this.data,
      this.networkOptions);
    this.network.on("stabilized", this.onNetworkStabilized);
  }

  public setNetworkOptions(options: vis.Options) {
    this.network.setOptions(Object.assign(this.networkOptions, options));
  }

  public drawDependenciesFrom(rootModuleName: string) {
    const rootNode: INodeDatum = {
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

  private getScale = (node: INodeDatum) => node._dependencyCount + node._dependentCount;

  private onNetworkStabilized = (params?: any) => {
    console.log("stabilized");
    this.network.fit();
  }

  private dependencyFetching(node: INodeDatum): Promise<void> {
    const fetchingDepth = node._depth + 1;
    return Promise.resolve(node)
      .then((res) => {
        return fetchPackageInfosAsync(res.label);
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
                // console.log(depNode);
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

  private _describeNewData(dependencies: any) {
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
            nodes: [] as INodeDatum[],
          });
      });
  }

  private clear() {
    this.labelStore = [];
    this.data.nodes.clear();
    this.data.edges.clear();
  }
}

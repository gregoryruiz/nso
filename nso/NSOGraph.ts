import _ from "lodash";
import vis from "vis";
import jspmFetcher from "./jspmFetcher";
import defaultOptions, {
  NODE_DEFAULT_COLOR,
  NODE_FAIL_COLOR,
  NODE_LOADING_COLOR,
  NODE_ROOT_COLOR,
} from "./options";

export default class NSOGraph {
  constructor(element) {

    this.labelStore = [];
    this.data = {
      nodes: new vis.DataSet({}),
      edges: new vis.DataSet({}),
    };

    this.getScale = function(node){
      return node._dependencyCount + node._dependentCount;
    };
    this.networkOptions = Object.assign({}, defaultOptions);
    this.network = new vis.Network(element, this.data, this.networkOptions);

    this.network.on("stabilized", () => {
      console.log("stabilized");
      this.network.fit();
    });

  }

  setNetworkOptions(options) {
    this.network.setOptions(Object.assign(this.networkOptions, options));
  }

  drawDependenciesFrom(rootModuleName) {
    const rootNode = {
      _depth: 0,
      _dependencyCount: 0,
      _dependentCount: 0,
      id: 0,
      mass: 1,
      label: rootModuleName,
      color: NODE_LOADING_COLOR,
    };

    this.data.nodes.add(rootNode);

    this.dependencyFetching(rootNode)
      .then(() => {
        console.log("Alllllllllllllllllllll doooooooooooooooone !", ...arguments);
        this.network.fit();
      });
  }

  dependencyFetching(node) {
    const fetchingDepth = node._depth + 1;
    return Promise.resolve(node)
      .then(jspmFetcher)
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
            newNodes = newNodes.map((node) => {
              node._depth = fetchingDepth;
              node._dependentCount = 0;
              node._dependencyCount = 0;
              node.color = NODE_LOADING_COLOR;

              return node;
            });
            this.data.nodes.add(newNodes);
            this.data.edges.add(
              newEdges.map((edge) => {
                const depNode = this.data.nodes.get(edge.to);
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
          id: node.id,
          color: node.id === 0 ? NODE_ROOT_COLOR : NODE_DEFAULT_COLOR,
        });
      })
      .catch((e) => {
        console.warn("fetching fail\n", e);
        this.data.nodes.update({
          id: node.id,
          color: NODE_FAIL_COLOR,
        });
        return {};
      });

  }

  _describeNewData(dependencies) {
    return Promise.resolve()
      .then(() => {
        return _(dependencies)
          .reduce((memo, version, dependencyName) => {

            let nodeId = this.labelStore.indexOf(dependencyName);

            if (nodeId < 0) {
              nodeId = this.labelStore.push(dependencyName);
              memo.nodes.push({
                id: nodeId,
                label: dependencyName,
              });
            }

            memo.edges.push({
              to: nodeId,
              arrows: "to",
            });

            return memo;
          }, {
            nodes: [],
            edges: [],
          });
      });
  }

  clear() {
    this.labelStore = [];
    this.data.nodes.clear();
    this.data.edges.clear();
  }

  destroy() {
    this.clear();

    this.data = null;
    this.network.destroy();
    this.network = null;
  }
}

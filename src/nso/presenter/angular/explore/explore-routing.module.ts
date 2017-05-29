//

import AngularUiRouterModule, {
  StateProvider,
  Transition,
  UrlRouter,
} from "@uirouter/angularjs";
import { module as ngModule } from "angular";

import { fetchPackageInfosAsync } from "nso/dal";
import {
  ILinkDatum,
  INodeDatum,
  IVertex,
} from "nso/models";
import {
  DependencyNetworkComponentName,
  DependencyWheelComponentName,
} from "nso/presenter/angular/shared";
import { IExploreRoutingParams } from "./explore-routing.interface";

//

export const ExploreRoutingModule: string = ngModule(module.id, [
  AngularUiRouterModule,
])
  .config(stateProviderConfig)
  .config(urlRouterProviderConfig)
  .name;

//

function stateProviderConfig($stateProvider: StateProvider) {
  "ngInject";

  const vertexResolver: ($transition$: Transition) => Promise<IVertex> = (
    // TODO(@douglasduteil): inject a vertex getter
    $transition$: Transition,
  ) => {
    "ngInject";
    const params: IExploreRoutingParams = $transition$.params();
    const graphDatas: IVertex = { nodes: new Array<INodeDatum>(), links: new Array<ILinkDatum>() };

    return GraphDatas.processGraphDatas(params.pkg, graphDatas)
      // .then(() => {
      //   console.log("ALL DONE !", ...arguments);
      //   console.log("processGraphDatas", graphDatas);
      // })
      .then(() => graphDatas);
  };

  $stateProvider.state({
    abstract: true,
    name: "explore.pkg",
    params: {
      pkg: {
        dynamic: true,
        value: "1",
      },
    },
    url: "/:pkg",
  });

  $stateProvider.state({
    component: DependencyNetworkComponentName,
    name: "explore.pkg.dependencyNetwork",
    resolve: {
      vertex: vertexResolver,
    },
    url: "/dependency-network",
  });

  $stateProvider.state({
    component: DependencyWheelComponentName,
    name: "explore.pkg.dependencyWheel",
    resolve: {
      vertex: vertexResolver,
    },
    url: "/dependency-wheel",
  });
}

function urlRouterProviderConfig($urlRouterProvider: UrlRouter) {
  "ngInject";

  $urlRouterProvider.when("/explore/{pkg}", "/explore/{pkg}/dependency-wheel");
}

class GraphDatas {
  public static data: IVertex;

  public static processGraphDatas(packageName: string, data: IVertex): Promise<INodeDatum> {
    GraphDatas.data = data;
    return Promise
      .resolve(packageName)
      .then((pkg) => {
        let node: INodeDatum;
        if (!GraphDatas.nodeMap.has(pkg)) {
          const nodeId = GraphDatas.nodeLabels.push(pkg);
          node = { id: nodeId, label: pkg };
          GraphDatas.nodeMap.set(pkg, node);
        } else {
          node = GraphDatas.nodeMap.get(pkg);
        }
        GraphDatas.data.nodes.push(node);
        return node;
      })
      .then(GraphDatas.fetchDependencies)
      // .then(GraphDatas.fetchDevDependencies)
      ;
  }

  private static nodeMap = new Map<string, INodeDatum>();
  private static nodeLabels = new Array<string>();

  private static processDescendants(dependencies: {}) {
    return Promise.resolve()
      .then(() => {
        return Object.entries(Object.assign({}, dependencies)).reduce((memo, [dependencyName]) => {
          let node: INodeDatum;
          if (!GraphDatas.nodeMap.has(dependencyName)) {
            const nodeId = GraphDatas.nodeLabels.push(dependencyName);
            node = { id: nodeId, label: dependencyName };
            GraphDatas.nodeMap.set(dependencyName, node);
            memo.nodes.push(node);
          } else {
            node = GraphDatas.nodeMap.get(dependencyName);
          }

          const edge: ILinkDatum = { to: node.id };
          edge.id = memo.edges.push(edge);

          return memo;
        }, {
            edges: [] as ILinkDatum[],
            nodes: [] as INodeDatum[],
          });
      });
  }

  private static fetchDependencies(node: INodeDatum): Promise<INodeDatum> {
    console.time(`fetchDependencies for ${node.label}`);
    return Promise.resolve(node)
      .then((res) => {
        return fetchPackageInfosAsync(res.label);
      })
      .then((pkg) => GraphDatas.processDescendants(pkg.dependencies))
      .then(({ nodes: newNodes, edges: newEdges }) => {
        GraphDatas.data.nodes.push(...newNodes);
        newEdges.forEach((newEdge) => newEdge.from = node.id);
        GraphDatas.data.links.push(...newEdges);

        return newNodes;
      })
      .then((nodes) => {
        return Promise
          .all(nodes.map(
            ({
                id,
            }) => GraphDatas.fetchDependencies(GraphDatas.data.nodes.find((n) => n.id === id)),
          ));
      })
      .then(() => console.timeEnd(`fetchDependencies for ${node.label}`))
      .then(() => node)
      .catch((e) => console.error("fetchDependencies", e))
      ;
  }

  private static fetchDevDependencies(node: INodeDatum): Promise<INodeDatum> {
    console.time(`fetchDevDependencies for ${node.label}`);
    return Promise.resolve(node)
      .then((res) => {
        return fetchPackageInfosAsync(res.label);
      })
      .then((pkg) => GraphDatas.processDescendants(pkg.devDependencies))
      .then(({ nodes: newNodes, edges: newEdges }) => {
        GraphDatas.data.nodes.push(...newNodes);
        newEdges.forEach((newEdge) => newEdge.from = node.id);
        GraphDatas.data.links.push(...newEdges);

        return newNodes;
      })
      .then((nodes) => {
        return Promise
          .all(nodes.map(
            ({
                id,
            }) => GraphDatas.fetchDevDependencies(GraphDatas.data.nodes.find((n) => n.id === id)),
          ));
      })
      .then(() => console.timeEnd(`fetchDevDependencies for ${node.label}`))
      .then(() => node)
      .catch((e) => console.error("fetchDevDependencies", e))
      ;
  }
}

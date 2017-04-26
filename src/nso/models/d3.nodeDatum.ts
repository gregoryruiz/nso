export interface INodeDatum {
  name: string;
  imports: string[];
  parent?: INodeDatum;
  children: INodeDatum[];
  key: string;
}

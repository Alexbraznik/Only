export interface ICirclesData {
  id: number;
  title: string;
}

export interface ISlidersData extends ICirclesData {
  date: number;
  parentId: number;
}

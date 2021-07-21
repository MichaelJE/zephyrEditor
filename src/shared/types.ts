export interface ICSVRecord {
  row: number;
  data: string[];
}

export interface ITableGeometry {
  rowDictionary: Record<number, number>;
  colDictionary: Record<number, number>;
}
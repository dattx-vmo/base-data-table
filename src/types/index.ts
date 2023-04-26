export interface IColumnType<T> {
  key: string;
  title: string;
  width?: number;
  sticky?: boolean;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  onSort?: (key: string, sortOrder: string) => void;
  render?: (column: IColumnType<T>, item: T, position?: string | number) => void;
}

export * from "./user";
export * from "./post";
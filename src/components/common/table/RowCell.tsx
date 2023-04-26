import get from "lodash.get";
import {IColumnType} from "../../../types"

interface Props<T> {
  item: T;
  column: IColumnType<T>;
  position?: number | string
}

export function RowCell<T>({ item, column, position }: Props<T>): JSX.Element {
  const value = get(item, column.key);
  
  return (
    <td className={`p-3 ${column.className ?? ''}`} width={column.width ?? ''}>
      {column.render ? column.render(column, item, position) : value}
    </td>
  );
}
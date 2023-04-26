
import {IColumnType} from "../../../types"
import { RowCell } from "./RowCell";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

export function Row<T>({ data, columns }: Props<T>): JSX.Element {
  return (
    <>
      {data.length === 0
        ? <>
          <tr>
            <td className="text-center" colSpan={columns.length}>No data</td>
          </tr>
        </>
        : <>
          {data.map((item, itemIndex) => (
            <tr key={`table-body-${itemIndex}`} className="border-b border-gray-200 hover:bg-gray-100 hover:cursor-pointer">
              {columns.map((column, columnIndex) => (
                <RowCell
                  key={`table-row-cell-${columnIndex}`}
                  item={item}
                  column={column}
                  position={itemIndex === data.length - 1 ? 'last' : itemIndex === 0 ? 'first' : itemIndex}
                />
              ))}
            </tr>
          ))}
      </>}
    </>
  );
}
import {IColumnType} from "../../../types"
import { useLocation } from "react-router-dom";

interface Props<T> {
  columns: IColumnType<T>[];
}

export function Header<T>({ columns }: Props<T>): JSX.Element {

  const {search} = useLocation()

  return (
    <tr className="text-sm text-slate-500 text-left bg-[#F5F5F5] rounded-none">
      {columns.map((column, columnIndex) => (
        <th
          key={`columnIndex-${columnIndex}`}
          className={`${column.headerClassName ?? '' } capitalize rounded-none text-sm p-3`}>
            <div className="flex items-center justify-between gap-4 w-max">
              <div style={{ width: column.width }} className="text-sm">
                {column.title}
              </div>
              {
                column.sortable && <div>
                  <div
                    onClick={() => !!column && column.onSort && column.onSort(column.key, 'desc')}
                    className={
                      `cursor-pointer dynamic-icon ${search?.includes(column.key) && search?.includes('desc') ? 'opacity-[1]' : 'opacity-[0.4]'}`
                    }
                  >
                    <i className="fas fa-sort-alpha-up"></i>
                  </div>
                  <div className={
                      `cursor-pointer dynamic-icon ${search?.includes(column.key) && search?.includes('asc') ? 'opacity-[1]' : 'opacity-[0.4]'}`
                    } onClick={() => !!column && column.onSort && column.onSort(column.key, 'asc')}>
                    <i className="fas fa-sort-alpha-down-alt"></i>
                  </div>
                </div>
              }
            </div>
        </th>
      ))}
    </tr>
  );
}
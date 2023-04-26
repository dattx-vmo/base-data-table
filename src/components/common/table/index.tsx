import {memo} from 'react';
import { Header } from "./Header";
import { Row } from "./Row";
import {IColumnType} from "../../../types"

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

export default function BaseTable<T>({ data, columns }: Props<T>): JSX.Element {
  return (
    <>
      <table className={`text-[14px] table w-full border rounded-none border-separate border-spacing-0`}>
        <thead className="bg-[#F5F5F5] rounded-none">
          <Header columns={columns} />
        </thead>
        <tbody className={`text-[14px]`}>
          <Row data={data} columns={columns} />
        </tbody>
      </table>
    </>
  );
}
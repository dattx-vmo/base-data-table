import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import {useNavigate, useSearchParams} from "react-router-dom";
import BaseTable from "../../components/common/table"
import Pagination from "../../components/common/pagination"
import BaseModal from "../../components/common/modal"
import Detail from "./components/Detail"
import { IUser, IColumnType } from "../../types"
import {sortBy} from "../../helpers"

const dayjs = require("dayjs")

function Users(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState<any>({
    offset: 0,
    limit: 10,
    search: ''
  })
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const modalUser = useRef<any>(null);

  const onSort = (key: string, orderBy: string) => {
    setSearchParams({orderBy: `${key}:${orderBy}`});
    const sortItems = sortBy([...users], key, orderBy) as IUser[]
    setUsers(sortItems)
  }

  const columns: IColumnType<IUser>[] = useMemo(() => {
    if (loading) return []
    return [
      {
        key: "id",
        title: "No",
        sortable: true,
        onSort: onSort,
        render: (column, item) => (<>
          <div className="text-blue-400">{item.id}</div>
        </>)
      },
      {
        key: "email",
        title: "Email",
        render: (column, item) => (<>
          <div onClick={() => onShowModalUser(item)} className="text-blue-400 flex items-center gap-2"><i className="fas fa-envelope"></i>{item.email}</div>
        </>)
      },
      {
        key: "first_name",
        title: "First Name",
        sortable: true,
        onSort: onSort,
      },
      {
        key: "last_name",
        title: "Last Name",
        sortable: true,
        onSort: onSort,
      },
      {
        key: "phone",
        title: "Phone",
        width: 200,
        render: (column, item) => (<>
          <div><i className="fas fa-phone mr-1"></i> {item.phone}</div>
        </>)
      },
      {
        key: "date_of_birth",
        title: "Birth Day",
        sortable: true,
        onSort: onSort,
        render: (column, item) => (<>
          <div className="w-[100px]">{dayjs(new Date(item.date_of_birth)).format("MMM D, YYYY")}</div>
        </>)
      },
      {
        key: "job",
        title: "Job",
      },
      {
        key: "street",
        title: "Street",
      },
      {
        key: "state",
        title: "State",
      },
      {
        key: "city",
        title: "City",
      },
      {
        key: "country",
        title: "country",
      },
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (params) {
      getUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const getUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://api.slingacademy.com/v1/sample-data/users?offset=${params.offset}&limit=${params.limit}&search=${params.search}`);
      const resData = await res.json();
      if (resData.success) {
        setUsers(resData.users)
        setTotalCount(resData.total_users)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const onShowModalUser = async (user: IUser) => {
    try {
      await modalUser.current.handlerModal({
        show: true,
        title: () => (<div className="text-black-700 font-bold text-[28px]">User Details</div>),
        body: () => (<Detail user={user} />),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onChangePage = (page: number) => {
    setCurrentPage(page)
    setParams({
      ...params,
      offset: (page - 1) * params.limit
    })
  }

  return <>
    {!loading && <BaseTable data={users} columns={columns} />}
    
    <Pagination totalCount={totalCount} currentPage={currentPage} onChangePage={onChangePage} />

    <BaseModal ref={modalUser} size="md" />
  </>
}

export default Users
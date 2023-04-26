import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import {useNavigate, useSearchParams} from "react-router-dom";
import BaseTable from "../../components/common/table"
import Pagination from "../../components/common/pagination"
import BaseModal from "../../components/common/modal"
import Category from "./Category"

import {sortBy} from "../../helpers"
import { IPost, IColumnType } from "../../types"

const dayjs = require("dayjs")

function Posts(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState<any>({
    offset: 0,
    limit: 10,
  })
  const [posts, setPosts] = useState<IPost[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const baseModalRef = useRef<any>(null)

  useEffect(() => {
    if (params) {
      getPosts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const getPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${params.offset}&limit=${params.limit}`);
      const resData = await res.json();
      if (resData.success) {
        setPosts(resData.blogs)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const onSort = (key: string, orderBy: string) => {
    setSearchParams({orderBy: `${key}:${orderBy}`});
    const sortItems = sortBy([...posts], key, orderBy) as IPost[]
    setPosts(sortItems)
  }

  const columns: IColumnType<IPost>[] = useMemo(() => {
    if (loading) return []
    
    return [
      {
        key: "id",
        title: "No",
        sortable: true,
        onSort: onSort,
        render: (column, item: IPost, position) => (<>
          <div className="text-blue-400">{item.id}</div>
        </>)
      },
      {
        key: "photo_url",
        title: "Photo",
        render: (column, item: IPost, position) => (<>
          <div onClick={() => onShowModal(item)}>
            <img width={200} src={item.photo_url} alt="photo_url" />
          </div>
        </>)
      },
      {
        key: "title",
        title: "title",
        sortable: true,
        onSort: onSort,
        render: (column, item: IPost, position) => (<>
          <div onClick={() => onShowModal(item)} className="text-blue-500">
            {item.title}
          </div>
        </>)
      },
      {
        key: "category",
        title: "category",
        render: (column, item: IPost, position) => (<Category category={item.category} />)
      },
      {
        key: "description",
        title: "description",
      },
      {
        key: "content_html",
        title: "Content",
        render: (column, item: IPost, position) => (<>
          <div className="overflow-auto w-[200px] max-h-[200px]" dangerouslySetInnerHTML={{__html: item.content_html}} />
        </>)
      },
      {
        key: "created_at",
        title: "Created At",
        sortable: true,
        onSort: onSort,
        render: (column, item: IPost, position) => (<>
          <div>{dayjs(new Date(item.created_at)).format("HH:mm:ss - MMM D, YYYY")}</div>
        </>)
      },
      {
        key: "updated_at",
        title: "Updated At",
        sortable: true,
        onSort: onSort,
        render: (column, item: IPost, position) => (<>
          <div>{dayjs(new Date(item.updated_at)).format("HH:mm:ss - MMM D, YYYY")}</div>
        </>)
      },
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onShowModal = async (item: IPost) => {
    try {
      await baseModalRef.current.handlerModal({
        show: true,
        title: () => (<div className="text-black-700 font-bold text-[28px]">{item.title}</div>),
        body: () => (<><div className="overflow-auto" dangerouslySetInnerHTML={{__html: item.content_html}} /></>),
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
    {!loading && <BaseTable data={posts} columns={columns} />}

    <Pagination totalCount={100} currentPage={currentPage} onChangePage={onChangePage} />

    <BaseModal ref={baseModalRef} size="2xl" />

  </>
}

export default Posts
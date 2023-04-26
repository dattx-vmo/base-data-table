import { usePagination, DOTS } from "../../../hooks/usePagination";
import classnames from 'classnames';
import "../../../assets/css/pagination.scss"

interface IPagination {
  totalCount: number;
  currentPage: number;
  onChangePage: (currentPage: number) => void;
  siblingCount?: number;
  pageSize?: number;
}

const Pagination = (props: IPagination) => {

  const {
    onChangePage,
    totalCount = 0,
    siblingCount = 1,
    currentPage = 0,
    pageSize = 10,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  });

  const lastPage: number | string = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onChangePage(currentPage + 1);
  };

  const onPrevious = () => {
    onChangePage(currentPage - 1);
  };

  return <>
    <div className="flex flex-col items-center my-12 pagination-container">
      <div className="flex text-gray-700">
          <div onClick={onPrevious} className={classnames('pagination-item w-[30px] mr-1 flex justify-center items-center rounded-full cursor-pointer', {
                disabled: currentPage === 1
              })}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="flex  font-medium rounded-full">
          <ul
            className={classnames('pagination-container')}
          >
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <li key={`dots-${index}`} className="pagination-item dots">&#8230;</li>;
              }

              return (
                <li
                  key={pageNumber}
                  className={classnames('pagination-item', {
                    selected: pageNumber === currentPage
                  })}
                  onClick={() => onChangePage(pageNumber as number)}
                >
                  {pageNumber}
                </li>
              );
            })}
          </ul>
          </div>
          <div onClick={onNext} className={classnames('pagination-item w-[30px] mr-1 flex justify-center items-center rounded-full cursor-pointer', {
                disabled: currentPage === lastPage
              })}>
            <i className="fas fa-chevron-right"></i>
          </div>
      </div>
  </div>
  </>
}

export default Pagination
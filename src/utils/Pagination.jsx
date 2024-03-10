// import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { GET_CURRENT_PAGE } from "./type";


function PaginatedItems({ totalCount=0 }) {
  const dispatch = useDispatch();
  
  const handlePageClick = (event) => {
    dispatch({
      type: GET_CURRENT_PAGE,
      payload: event.selected + 1,
    });
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel= {totalCount > 10 ?"Next >" : ''} 
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={Math.ceil(totalCount / 10)}
        previousLabel={totalCount > 10 ?"< Previous" : ''} 
        renderOnZeroPageCount={null}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={totalCount > 10 ?"page-link":""}
        nextClassName={"page-item"}
        nextLinkClassName={totalCount > 10 ?"page-link":""}
        activeClassName={"active"}
      />
    </>
  );
}

export default PaginatedItems;

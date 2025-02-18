import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { AlertCircle } from "react-feather";

const NewPagination = ({
  data = [], // Data to display
  totalRecords = 0, // Total number of records from the API
  itemsPerPage = 10, // Number of items per page
  currentPage = 0, // Current page (0-based index)
  totalPages = 1, // Total pages from the API
  onPageChange, // Function to handle page changes
  renderItems, // Function to render current items
  marginTop,
}) => {
  const handlePageClick = (event) => {
    const newPage = event.selected;
    localStorage.setItem("camerapage", newPage); // Save the selected page
    if (onPageChange) {
      onPageChange(newPage + 1); // Pass the 1-based page index to the parent
    }
  };

  // Dynamic `pageRangeDisplayed` and `marginPagesDisplayed`
  const pageRangeDisplayed = currentPage >= totalPages - 3 ? 1 : 2;
  const marginPagesDisplayed = currentPage >= totalPages - 3 ? 2 : 1;

  return (
    <>
      {data.length > 0 ? (
        renderItems(data)
      ) : (
        <center style={{ marginTop: marginTop || "15%" }}>
          <AlertCircle color="grey" />
          <h5 className="txt-grey" style={{ color: "grey" }}>
            {"No Data Found"}
          </h5>
        </center>
      )}
      <ReactPaginate
        nextLabel={
          <li className="page-item">
            <a type="button" className="page-link">Next</a>
          </li>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        forcePage={currentPage} // Force the selected page
        pageCount={totalPages} // Total pages from the API
        previousLabel={
          <li className="page-item">
            <a type="button" className="page-link">Prev</a>
          </li>
        }
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default NewPagination;
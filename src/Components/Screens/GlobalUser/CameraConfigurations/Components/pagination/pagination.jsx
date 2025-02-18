// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import "./pagination.css";
// import { AlertCircle } from "react-feather";

// const CustomPagination = ({
//   data,
//   itemsPerPage = 10,
//   onPageChange,
//   renderItems,
//   marginTop,
// }) => {
//   const [currentItems, setCurrentItems] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     // Reset to the first page when data changes
//     setCurrentPage(0);
//     setItemOffset(0);
//   }, [data]);

//   useEffect(() => {
//     const endOffset = Math.min(itemOffset + itemsPerPage, data.length);
//     setCurrentItems(data.slice(itemOffset, endOffset));

//     const newPageCount = Math.ceil(data.length / itemsPerPage);
//     setPageCount(newPageCount);
//   }, [itemOffset, itemsPerPage, data]);

//   const handlePageClick = (event) => {
//     const newOffset = event.selected * itemsPerPage;
//     setItemOffset(newOffset);
//     const newPage = event.selected;
//     setCurrentPage(newPage);

//     if (onPageChange) {
//       onPageChange(newOffset, itemsPerPage);
//     }
//   };

//   return (
//     <>
//       {currentItems.length > 0 ? (
//         renderItems(currentItems)
//       ) : (
//         <center style={{ marginTop: marginTop ? marginTop : "15%" }}>
//           <AlertCircle color="grey" />
//           <h5 className="txt-grey" style={{ color: "grey" }}>
//             {"No Data Found"}
//           </h5>
//         </center>
//       )}
//       <ReactPaginate
//         nextLabel={<li className="page-item">
//           <a type="button" className="page-link">Next</a>
//         </li>}
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={2}
//         marginPagesDisplayed={0}
//         forcePage={currentPage}
//         pageCount={pageCount}
//         previousLabel={<li className="page-item" >
//           <a type="button" className="page-link">Prev</a>
//         </li>}
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// };

// export default CustomPagination;
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { AlertCircle } from "react-feather";

const CustomPagination = ({
  data,
  itemsPerPage = 10,
  onPageChange,
  renderItems,
  marginTop,
}) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Reset to the first page when data changes
    
    const savedPage = parseInt(localStorage.getItem('camerapage'), 10) || 0;
    setCurrentPage(savedPage);
    setItemOffset(savedPage * itemsPerPage);
  
  }, [data]);

  useEffect(() => {
  


    const endOffset = Math.min(itemOffset + itemsPerPage, data.length);
    setCurrentItems(data.slice(itemOffset, endOffset));

    const newPageCount = Math.ceil(data.length / itemsPerPage);
    setPageCount(newPageCount);
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    const newPage = event.selected;
    localStorage.setItem('camerapage',newPage)
    setCurrentPage(newPage);

    if (onPageChange) {
      onPageChange(newOffset, itemsPerPage);
    }
  };

  // Dynamic pageRangeDisplayed and marginPagesDisplayed
  const pageRangeDisplayed = currentPage >= pageCount - 3 ? 1 : 2;
  const marginPagesDisplayed = currentPage >= pageCount - 3 ? 2 : 1;

  return (
    <>
      {currentItems.length > 0 ? (
        renderItems(currentItems)
      ) : (
        <center style={{ marginTop: marginTop ? marginTop : "15%" }}>
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
        forcePage={currentPage}
        pageCount={pageCount}
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

export default CustomPagination;


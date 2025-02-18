import React, { useState, useEffect } from 'react';
import AreaService from '../../../../../../api/areaService';

function CustomPagination() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cache, setCache] = useState({});
  const [itemsPerPage] = useState(20); // Fixed number of items per page
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = (page) => {
    if (cache[page]) {
      setItems(cache[page].alerts);
      setTotalPages(cache[page].total_pages);
    } else {
      const payload = {
        "user_id": 1,
        "identifier": "custom",
        "filters": {
          "module": "",
          "severity": "",
          "shift": "",
          "date": "",
          "week": "",
          "month": "",
          "starting": "2024-10-10",
          "ending": "2024-10-19"
        },
        "pagination": {
          "page_no": page,
          "per_page": itemsPerPage
        }
      };
      AreaService.getFilterAlerts(payload)
        .then(response => {
          if (response && response.data && response.data.data) {
            setTotalPages(response.data.data.total_pages);
            setCache(prev => ({ ...prev, [page]: response.data.data }));
            setItems(response.data.data.alerts);
          } else {
            setItems([]);
            setTotalPages(0);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setItems([]);
          setTotalPages(0);
        });
    }
  };

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent changing to invalid page
    setCurrentPage(newPage);
  };
  // const renderPageNumbers = () => {
  //   const pages = [];
  //   if (totalPages <= 5) {
  //     for (let i = 1; i <= totalPages; i++) {
  //       pages.push(i);
  //     }
  //   } else {
  //     pages.push(1);
  //     let start = Math.max(2, currentPage - 1);
  //     let end = Math.min(totalPages - 1, currentPage + 1);

  //     if (currentPage - 1 <= 2) {
  //       end = 4;
  //     }
  //     if (totalPages - currentPage <= 2) {
  //       start = totalPages - 3;
  //     }

  //     if (start > 2) {
  //       pages.push('...');
  //     }
  //     for (let i = start; i <= end; i++) {
  //       pages.push(i);
  //     }
  //     if (end < totalPages - 1) {
  //       pages.push('...');
  //     }
  //     pages.push(totalPages);
  //   }
  //   return pages.map(page => (
  //     typeof page === 'number' ? (

  //       <li

  //         className={`page-item ${currentPage === page ? 'active' : ''}`}
  //         onClick={() => handlePageChange(page)} style={{ cursor: 'pointer' }}
  //       >
  //         <a className=" page-link">{page}</a>
  //         {/* <button key={page} onClick={() => handlePageChange(page)} style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}>
  //                {page}
  //              </button> */}
  //       </li>

  //     ) : (
  //       <span key={page} className="page-item"> {page} </span>

  //     )
  //   ));
  // };


  function getPaginationRange(currentPage, totalPages) {
    const pageNeighbors = 1;  
    const totalPageNumbers = pageNeighbors * 2 + 3;  
    if (totalPages <= totalPageNumbers) { 
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } 
    let paginationRange = [1]; 
    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors); 
    if (startPage > 2) {
      paginationRange.push("...");
    } 
    for (let i = startPage; i <= endPage; i++) {
      paginationRange.push(i);
    } 
    if (endPage < totalPages - 1) {
      paginationRange.push("...");
    } 
    paginationRange.push(totalPages);
  
    return paginationRange;
  }
  
  return (
    <div>
      {items.map(item => (
        <div key={item.operation_safety_id}>{item.operation_safety_id}</div>
      ))}
      <div className="pagination-primary d-flex flex-wrap justify-content-center pb-3">
      <ul className="pagination" style={{ borderRadius: "5px 0px 0px 5px", cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
        <li disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>
          <a className="page-link">Previous</a>
        </li>
      </ul>
      <ul className="pagination">
        {getPaginationRange(currentPage, totalPages).map((pageNumber, index) => (
          <li key={index} style={{ cursor: "pointer" }} className={`page-item ${pageNumber === currentPage ? "active" : ""} ${pageNumber === "..." ? "disabled" : ""}`}>
            {pageNumber === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <a className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </a>
            )}
          </li>
        ))}
      </ul>
      <ul className="pagination" style={{ borderRadius: "0px 5px 5px 0px", cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
        <li disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          <a className="page-link">Next</a>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default CustomPagination;

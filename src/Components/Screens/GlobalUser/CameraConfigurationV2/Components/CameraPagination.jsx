import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CameraPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <Pagination style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index} active={currentPage === index + 1}>
          <PaginationLink onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default CameraPagination;

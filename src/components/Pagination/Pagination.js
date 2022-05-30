import React, { useEffect, useState } from 'react'
import './Pagination.css'

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const populatePageArray = (offset, limit) => {
    const pageNumbers = [];
    for (let i = offset; i <= limit; i++) {
      pageNumbers.push(i);
    }
    setPageArray(pageNumbers);
  }
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const handleNext = () => {
    goToPage(currentPage + 1);
  }

  const handlePrevious = () => {
    goToPage(currentPage - 1);
  }

  const goToPage = (pageNo) => {
    setCurrentPage(pageNo);
    paginate(pageNo);
    populatePageArray(pageNo, pageNo + 4 > totalPages ? totalPages : pageNo + 4);
  }

  useEffect(() => {
    if (pageArray.length > 0) {
      return;
    }
    const totalPages = Math.ceil(totalPosts / postsPerPage)
    const pageNumbersToShow = totalPages > 5 ? 5 : totalPages;
    const pageNumbers = [];
    for (let i = 1; i <= pageNumbersToShow; i++) {
      pageNumbers.push(i);
    }
    setPageArray(pageNumbers);
  }, [pageArray]);

  return (
    <div className='pagination'>
      <button type='button' onClick={() => { goToPage(1) }}>First Page</button>
      <button type='button' onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
      {pageArray.map(number => (
        <li key={number} className={`page-item ${number === currentPage ? "selected" : ""}`}>
          <span onClick={() => goToPage(number)} className='page-link'>
            {number}
          </span>
        </li>
      ))}
      <button type='button' onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      <button type='button' onClick={() => { goToPage(totalPages) }}>Last Page</button>
      <div>Showing {currentPage} of {totalPages}</div>
    </div>
  );
};

export default Pagination
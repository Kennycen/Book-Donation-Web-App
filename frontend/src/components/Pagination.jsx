const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="sr-only">Previous page</span>
        ←
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 rounded-md border ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next page</span>
        →
      </button>
    </div>
  );
};

export default Pagination;
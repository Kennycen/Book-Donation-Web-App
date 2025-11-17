import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useLatestBooks } from "../hooks/useBooks";

const RecommendedBooks = () => {
  const { books, isLoading, error } = useLatestBooks();

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h2 className="font-prata text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Latest Books
      </h2>

      {error && <div className="text-center text-red-600 py-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="w-full h-[350px] mb-4 rounded-md bg-gray-100 overflow-hidden">
                      <img
                        src={book.imageUrl || assets.placeholder}
                        alt={book.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = assets.placeholder;
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                  <div className="p-4 border-t mt-auto">
                    <Link
                      to={`/product/${book._id}`}
                      className="block w-full px-4 py-2 text-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !error && (
              <div className="text-center text-gray-500 py-8">
                No books available at the moment.
              </div>
            )
          )}
        </>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/inventory"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Explore More Books
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default RecommendedBooks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">📚 Books Library</h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md transition"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span>Add Book</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No books available. Add some 📖
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full bg-white border-collapse">
            <thead className="bg-sky-100">
              <tr>
                <th className="p-3 text-left text-gray-700 font-semibold">No</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Title</th>
                <th className="p-3 text-left text-gray-700 font-semibold max-md:hidden">Author</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Year</th>
                <th className="p-3 text-center text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3 text-gray-800 font-medium">{book.title}</td>
                  <td className="p-3 text-gray-600 max-md:hidden">{book.author}</td>
                  <td className="p-3 text-gray-600">{book.publishedYear}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/books/details/${book._id}`}
                        className="text-green-600 hover:text-green-800 transition"
                        title="View Details"
                      >
                        <BsInfoCircle className="text-2xl" />
                      </Link>
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="text-yellow-500 hover:text-yellow-700 transition"
                        title="Edit Book"
                      >
                        <AiOutlineEdit className="text-2xl" />
                      </Link>
                      <Link
                        to={`/books/delete/${book._id}`}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Book"
                      >
                        <MdOutlineDelete className="text-2xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;

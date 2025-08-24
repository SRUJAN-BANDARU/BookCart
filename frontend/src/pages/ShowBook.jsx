
import React, { useState, useEffect } from "react";
import Spinner from "./../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header with Back + Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-800">📖 Book Details</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/books/edit/${book._id}`}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition"
          >
            <AiOutlineEdit className="text-xl" />
            <span>Edit</span>
          </Link>
          <Link
            to={`/books/delete/${book._id}`}
            className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
          >
            <MdOutlineDelete className="text-xl" />
            <span>Delete</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-sky-200">
          <h2 className="text-2xl font-semibold text-sky-600 mb-6 text-center">
            {book.title || "Untitled Book"}
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">📌 ID:</span>
              <span className="text-gray-800">{book._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">✍️ Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">📅 Published:</span>
              <span className="text-gray-800">{book.publishedYear}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">🕒 Created At:</span>
              <span className="text-gray-800">
                {book.createdAt ? new Date(book.createdAt).toLocaleString() : "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">🔄 Updated At:</span>
              <span className="text-gray-800">
                {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "—"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createHandler = () => {
    const book = { title, author, publishedYear };
    setLoading(true);

    axios
      .post(`http://localhost:5555/books`, book)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happened, please check console');
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-sky-100 p-6">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-center text-sky-700 my-6">
          Create a New Book
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-sky-200">
            {/* Title Input */}
            <div className="my-6">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                placeholder="Enter book title"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Author Input */}
            <div className="my-6">
              <label
                htmlFor="author"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                id="author"
                placeholder="Enter author name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Published Year Input */}
            <div className="my-6">
              <label
                htmlFor="year"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Published Year
              </label>
              <input
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                id="year"
                placeholder="e.g. 2023"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={createHandler}
                className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-xl shadow-md hover:bg-sky-600 transition duration-300"
              >
                Save Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;

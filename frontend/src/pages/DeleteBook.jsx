import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteHandler = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
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
    <div className="p-6 flex flex-col items-center">
      {/* Back button aligned to top-left */}
      <div className="w-full flex justify-start mb-4">
        <BackButton />
      </div>

      <div className="border-2 border-red-400 rounded-2xl w-[600px] p-8 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Delete Book</h1>
        <p className="text-lg text-gray-700 mb-6">
          Are you sure you want to delete this book? This action cannot be undone.
        </p>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md"
            >
              Yes, Delete it
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateBook from './pages/CreateBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import EditBook from './pages/EditBook.jsx';
import Home from './pages/Home.jsx';
import ShowBook from './pages/ShowBook.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/book/create' element={<CreateBook />} />
      <Route path='/book/details/:id' element={<ShowBook />} />
      <Route path='/book/edit/:id' element={<EditBook />} />
      <Route path='/book/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App

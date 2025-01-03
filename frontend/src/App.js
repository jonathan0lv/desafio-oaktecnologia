import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cadastro" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

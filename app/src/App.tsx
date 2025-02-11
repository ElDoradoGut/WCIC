import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Ingredientes } from './views/ingredientes.tsx';
import { Receta } from './views/receta.tsx';
import { ListaRecetas } from './views/recetas.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaRecetas />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

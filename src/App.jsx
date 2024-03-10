import React from 'react'
import Root from './Root/Root.jsx'
import Cart from './pages/Cart/cart.jsx'
import SignUp from './pages/SignUp/signup.jsx'
import SignIn from './pages/SignIn/signin.jsx'
import Home from './pages/Home/Components/Home.jsx'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Navbar from './componets/Navbar.jsx'
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/SignIn',
        element: <SignIn />
      },

      {
        path: '/SignUp',
        element: <SignUp />
      },

      {
        path: '/Cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },


]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  )
}

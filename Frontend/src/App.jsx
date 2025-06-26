import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './Components/Navbar'; // Sidebar
import Footer from './Components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SidebarLayout from './Components/SidebarLayout';
import Projects from './Components/Projects';
import Roadmaps from './Components/Roadmaps';
import FeedbackModal from './Components/FeedbackModal'; // ✅ Imported FeedbackModal

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <SidebarLayout>
          <Landing />
        </SidebarLayout>
        </>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/home',
      element: (
        <SidebarLayout>
          <Home />
        </SidebarLayout>
      ),
    },
    {
      path: '/about',
      element: (
        <SidebarLayout>
          <div>About Page</div>
        </SidebarLayout>
      ),
    },
    {
      path: '/projects',
      element: (
        <SidebarLayout>
          <Projects />
        </SidebarLayout>
      ),
    },
    {
      path: '/contact',
      element: (
        <SidebarLayout>
          <div>Contact Page</div>
        </SidebarLayout>
      ),
    },
    {
      path: '/roadmaps',
      element: (
        <SidebarLayout>
          <Roadmaps />
        </SidebarLayout>
      ),
    },
    {
      path: '/feedback',
      element: (
        <SidebarLayout>
          <FeedbackModal isOpen={true} onClose={() => {}} /> {/* Test route */}
        </SidebarLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

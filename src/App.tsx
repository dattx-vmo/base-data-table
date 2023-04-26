import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/products"
import Posts from "./pages/posts"
import Users from "./pages/users"
import SideBar from "./components/layout/SideBar"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="flex font-inter antialiased bg-slate-100 text-slate-600 sidebar-expanded font-sans">
        <SideBar />
        <section className="flex-1">
          <div className="h-[100vh] grid auto-rows-[auto_1fr_auto]">
            <div className="top-bar flex-center bg-white border-b border-slate-200 flex items-center justify-between h-16 -mb-px px-4 sm:px-6 lg:px-8">Topbar</div>
            <div className="main-content overflow-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Routes>
                <Route path="/" element={<>Home</>} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </div>
            {/* <div className="footer">footer</div> */}
          </div>
        </section>
      </main>
      
    </BrowserRouter>
  );
}

export default App;

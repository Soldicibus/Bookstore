import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import Mainpage from "./components/pages/mainpage_cabinet/Mainpage";
import Header from "./components/pages/layout/Header.jsx";
import Auth from "./components/pages/Auth";
import Register from "./components/pages/Register";
import Cabinet from "./components/pages/mainpage_cabinet/Cabinet";
import NotFound from "./components/pages/mainpage_cabinet/NotFound";

// Book pages
import FilteredBooksView from "./components/pages/book/FilteredBooksView";
import OneBookView from "./components/pages/book/OneBookView";
import FavoriteBooks from "./components/pages/book/FavoriteBooks";

// Cart and Order pages
import PreOrderPage from "./components/pages/cart/PreOrderPage";
import AllOrders from "./components/pages/order/AllOrders";

// Reviews page
import BookReview from "./components/pages/reviews/BookReview";

import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext.jsx";

// initialize a single client for the app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    // if a token is present, prefetch user data
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    // The useMe hook will automatically fetch when AuthProvider is mounted
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Mainpage />} />
        
        {/* Book Routes */}
        <Route path="/books" element={<FilteredBooksView />} />
        <Route path="/book/:id" element={<OneBookView />} />
        <Route path="/favorites" element={<FavoriteBooks />} />
        
        {/* Reviews Route */}
        <Route path="/reviews" element={<BookReview />} />
        
        {/* Protected Routes */}
        <Route path="/cabinet" element={<RequireAuth><Cabinet /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><PreOrderPage /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><AllOrders /></RequireAuth>} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("app")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

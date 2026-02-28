import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import Mainpage from "./components/pages/mainpage_cabinet/Mainpage";
import Header from "./components/pages/layout/Header.jsx";
import Auth from "./components/pages/Auth";
import Register from "./components/pages/Register";
import Cabinet from "./components/pages/mainpage_cabinet/Cabinet";
import NotFound from "./components/pages/mainpage_cabinet/NotFound";
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
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/cabinet" element={<RequireAuth><Cabinet /></RequireAuth>} />
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

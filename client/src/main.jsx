import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import Mainpage from "./components/pages/Mainpage";
import Sidebar from "./components/Sidebar";
import Auth from "./components/pages/Auth";
import Cabinet from "./components/pages/Cabinet";
import NotFound from "./components/pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { me } from './api/auth.js';

// initialize a single client for the app
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // if a token is present, try to prefetch key data for the user
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    (async () => {
      try {
        const res = await me();
      } catch (e) {
        // ignore - might be unauthorized
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/cabinet" element={<RequireAuth><Cabinet /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("app")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
export default App;

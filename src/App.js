import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Cat from "./pages/Cat";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Favourite from "./pages/Favourite";
import Search from "./pages/Search";

import AuthProvider from "./contexts/AuthProvider";
import ToastProvider from "./contexts/ToastProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cat/" element={<Home />} />
            <Route path="/cat/:id" element={<Cat />} />
            <Route path="/favourites" element={<Favourite />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Home from "./pages/Home";
import Cat from "./pages/Cat";
import NotFound from "./pages/NotFound";

import ToastProvider from "./contexts/ToastProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/" element={<Home />} />
          <Route path="/cat/:id" element={<Cat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

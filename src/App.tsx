import { Navigate, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import { SiteLayout } from "./components/SiteLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/sewamobil" />} />
      <Route path=":slug" element={<SiteLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import CatalogPage from "./pages/CatalogPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import SuccessPage from "./pages/SuccessPage";
import { SiteLayout } from "./components/SiteLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/sewamobil" />} />
      <Route path=":slug" element={<SiteLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="booking/:serviceSlug" element={<BookingPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;

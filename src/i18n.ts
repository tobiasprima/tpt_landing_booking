import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: { home: "Home", booking: "Booking", contact: "Contact" },
      hero: {
        eyebrow: "Reliable Indonesian car rental",
        cta: "Book a car",
        secondary: "Contact us"
      },
      booking: {
        title: "Book your car",
        checkAvailability: "Check availability",
        submit: "Create booking"
      },
      contact: { title: "Get in touch" }
    }
  },
  id: {
    translation: {
      nav: { home: "Beranda", booking: "Booking", contact: "Kontak" },
      hero: {
        eyebrow: "Sewa mobil lokal yang ramah",
        cta: "Pesan mobil",
        secondary: "Hubungi kami"
      },
      booking: {
        title: "Pesan mobil Anda",
        checkAvailability: "Cek ketersediaan",
        submit: "Buat booking"
      },
      contact: { title: "Hubungi kami" }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "id",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;

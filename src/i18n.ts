import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        catalog: "Catalog",
        booking: "Booking",
        contact: "Contact",
      },
      hero: {
        eyebrow: "Reusable booking website for services and rentals",
        cta: "Browse offerings",
        secondary: "Start booking",
      },
      home: {
        featuredEyebrow: "Popular options",
        featuredTitle: "Featured services and rental items",
        viewAll: "View full catalog",
        learnMore: "View details",
        bookNow: "Book now",
        whyTitle: "Built for practical booking flows",
        valueOneTitle: "Flexible for many business types",
        valueOneBody:
          "Use the same public experience for services, venues, rentals, and event-based businesses.",
        valueTwoTitle: "Availability-aware inquiry flow",
        valueTwoBody:
          "Customers can review options, select packages, and check availability before they send a request.",
        valueThreeTitle: "WhatsApp-friendly follow-up",
        valueThreeBody:
          "Every booking can continue with a direct WhatsApp handoff for fast human confirmation.",
      },
      booking: {
        title: "Request a booking",
        selectOffering: "Choose a service or rental item",
        selectOption: "Select {{name}}",
        package: "Package",
        selectPackage: "Select a package",
        estimatedPrice: "Estimated price:",
        scheduleAndCustomer: "Schedule and customer details",
        quantity: "Quantity",
        start: "Requested start",
        end: "Requested end",
        name: "Customer name",
        phone: "Phone / WhatsApp",
        email: "Email",
        notes: "Notes",
        checkAvailability: "Check availability",
        submit: "Send booking request",
        needHelp: "Need help before booking? Continue on WhatsApp.",
        created: "Booking request created.",
        createdFallback: "Please follow the next-step instructions from the business.",
      },
      contact: { title: "Get in touch" },
      catalog: {
        title: "Catalog",
        intro: "Browse all services and rental items available for booking.",
        details: "View details",
      },
      detail: {
        includes: "What is included",
        packageOptions: "Package options",
        configurableOptions: "Configurable options",
        startBooking: "Start booking",
        backToCatalog: "Back to catalog",
      },
      success: {
        title: "Booking request sent",
        body:
          "Your request has been recorded. The business can now review the details and continue the conversation.",
        whatsapp: "Continue on WhatsApp",
        browseMore: "Browse more offerings",
      },
    },
  },
  id: {
    translation: {
      nav: {
        home: "Beranda",
        catalog: "Katalog",
        booking: "Booking",
        contact: "Kontak",
      },
      hero: {
        eyebrow: "Template website booking untuk bisnis jasa dan rental",
        cta: "Lihat penawaran",
        secondary: "Mulai booking",
      },
      home: {
        featuredEyebrow: "Pilihan unggulan",
        featuredTitle: "Layanan dan item rental unggulan",
        viewAll: "Lihat semua katalog",
        learnMore: "Lihat detail",
        bookNow: "Booking sekarang",
        whyTitle: "Dibangun untuk alur booking yang praktis",
        valueOneTitle: "Fleksibel untuk banyak jenis bisnis",
        valueOneBody:
          "Gunakan pengalaman publik yang sama untuk jasa, venue, rental, dan bisnis berbasis acara.",
        valueTwoTitle: "Alur inquiry dengan cek ketersediaan",
        valueTwoBody:
          "Pelanggan dapat melihat opsi, memilih paket, dan mengecek ketersediaan sebelum mengirim permintaan.",
        valueThreeTitle: "Lanjutan cepat lewat WhatsApp",
        valueThreeBody:
          "Setiap booking dapat langsung dilanjutkan ke WhatsApp untuk konfirmasi manual yang cepat.",
      },
      booking: {
        title: "Kirim permintaan booking",
        selectOffering: "Pilih layanan atau item rental",
        selectOption: "Pilih {{name}}",
        package: "Paket",
        selectPackage: "Pilih paket",
        estimatedPrice: "Estimasi harga:",
        scheduleAndCustomer: "Jadwal dan data pelanggan",
        quantity: "Jumlah",
        start: "Mulai yang diminta",
        end: "Selesai yang diminta",
        name: "Nama pelanggan",
        phone: "Telepon / WhatsApp",
        email: "Email",
        notes: "Catatan",
        checkAvailability: "Cek ketersediaan",
        submit: "Kirim permintaan booking",
        needHelp: "Butuh bantuan sebelum booking? Lanjut ke WhatsApp.",
        created: "Permintaan booking berhasil dibuat.",
        createdFallback: "Silakan ikuti instruksi langkah berikutnya dari bisnis.",
      },
      contact: { title: "Hubungi kami" },
      catalog: {
        title: "Katalog",
        intro: "Jelajahi semua layanan dan item rental yang tersedia untuk dibooking.",
        details: "Lihat detail",
      },
      detail: {
        includes: "Yang termasuk",
        packageOptions: "Pilihan paket",
        configurableOptions: "Opsi yang bisa dipilih",
        startBooking: "Mulai booking",
        backToCatalog: "Kembali ke katalog",
      },
      success: {
        title: "Permintaan booking terkirim",
        body:
          "Permintaan Anda sudah tercatat. Bisnis dapat meninjau detail dan melanjutkan percakapan berikutnya.",
        whatsapp: "Lanjut ke WhatsApp",
        browseMore: "Lihat penawaran lain",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "id",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;

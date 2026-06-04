import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBusiness } from "../hooks";

const ContactPage = () => {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data: business } = useBusiness(slug);

  return (
    <main className="section">
      <h1>{t("contact.title")}</h1>
      <div className="three-col">
        <div className="card">
          <h3>WhatsApp</h3>
          <p>{business?.whatsapp_number || "-"}</p>
        </div>
        <div className="card">
          <h3>Phone & Email</h3>
          <p>{business?.public_phone || "-"}</p>
          <p>{business?.public_email || "-"}</p>
        </div>
        <div className="card">
          <h3>Address</h3>
          <p>{business?.address || "-"}</p>
        </div>
      </div>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Social links</h2>
        <ul className="social-list">
          {business?.social_links.map((link) => (
            <li key={link.id}>
              <a href={link.url} rel="noreferrer" target="_blank">
                {link.platform}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ContactPage;

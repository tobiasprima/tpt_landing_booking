import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBusiness } from "../hooks";

const SuccessPage = () => {
  const { slug = "" } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { data: business } = useBusiness(slug);
  const params = new URLSearchParams(location.search);
  const serviceName = params.get("service");
  const customerName = params.get("name");
  const whatsappNumber = business?.whatsapp_number?.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hi ${business?.name || ""}, I just sent a booking request${
      serviceName ? ` for ${serviceName}` : ""
    }${customerName ? ` under the name ${customerName}` : ""}.`
  );

  return (
    <main className="section">
      <section className="card">
        <p className="eyebrow">{t("booking.title")}</p>
        <h1>{t("success.title")}</h1>
        <p>{t("success.body")}</p>
        {serviceName && <p className="muted-text">{serviceName}</p>}
        <div className="hero-actions">
          {whatsappNumber && (
            <a
              className="primary-button"
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              rel="noreferrer"
              target="_blank"
            >
              {t("success.whatsapp")}
            </a>
          )}
          <Link className="secondary-button" to={`/${slug}/catalog`}>
            {t("success.browseMore")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;

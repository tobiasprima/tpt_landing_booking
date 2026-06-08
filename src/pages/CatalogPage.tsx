import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useServices } from "../hooks";

const CatalogPage = () => {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data: services = [] } = useServices(slug);

  return (
    <main className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("nav.catalog")}</p>
          <h1>{t("catalog.title")}</h1>
          <p>{t("catalog.intro")}</p>
        </div>
      </div>

      <div className="card-grid">
        {services.map((service) => (
          <article className="card" key={service.id}>
            <div className="card-image">
              {service.cover_image_url ? (
                <img alt={service.name} src={service.cover_image_url} />
              ) : (
                <div className="image-placeholder">{service.name}</div>
              )}
            </div>
            <h2>{service.name}</h2>
            <p>{service.short_description}</p>
            <strong>
              Rp {service.price_amount.toLocaleString()} / {service.unit_label}
            </strong>
            <div className="hero-actions">
              <Link className="secondary-button" to={`/${slug}/services/${service.slug}`}>
                {t("catalog.details")}
              </Link>
              <Link className="primary-button" to={`/${slug}/booking/${service.slug}`}>
                {t("home.bookNow")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default CatalogPage;

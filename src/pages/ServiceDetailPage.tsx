import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useServiceDetail } from "../hooks";

const ServiceDetailPage = () => {
  const { slug = "", serviceSlug = "" } = useParams();
  const { t } = useTranslation();
  const { data } = useServiceDetail(slug, serviceSlug);

  if (!data) {
    return (
      <main className="section">
        <p className="muted-text">{t("catalog.intro")}</p>
      </main>
    );
  }

  const { service, packages, option_groups } = data;

  return (
    <main className="section">
      <div className="detail-hero">
        <div>
          <p className="eyebrow">{t("catalog.title")}</p>
          <h1>{service.name}</h1>
          <p>{service.description || service.short_description}</p>
          <strong>
            Rp {service.price_amount.toLocaleString()} / {service.unit_label}
          </strong>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to={`/${slug}/booking/${service.slug}`}>
            {t("detail.startBooking")}
          </Link>
          <Link className="secondary-button" to={`/${slug}/catalog`}>
            {t("detail.backToCatalog")}
          </Link>
        </div>
      </div>

      <div className="three-col">
        <section className="card">
          <h2>{t("detail.includes")}</h2>
          <ul className="bullet-list">
            <li>{service.short_description}</li>
            <li>{service.supports_hourly ? "Hourly support" : "Fixed-session support"}</li>
            <li>{service.supports_multi_day ? "Multi-day scheduling available" : "Single-session focused"}</li>
          </ul>
        </section>

        <section className="card">
          <h2>{t("detail.packageOptions")}</h2>
          {packages.length > 0 ? (
            <ul className="meta-list">
              {packages.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong>
                  <div className="muted-text">
                    {item.price_amount ? `Rp ${item.price_amount.toLocaleString()}` : "Custom pricing"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-text">Standard base pricing applies.</p>
          )}
        </section>

        <section className="card">
          <h2>{t("detail.configurableOptions")}</h2>
          {option_groups.length > 0 ? (
            <ul className="meta-list">
              {option_groups.map((group) => (
                <li key={group.id}>
                  <strong>{group.name}</strong>
                  <div className="muted-text">
                    {(group.values || []).map((value) => value.name).join(", ") || "-"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-text">No extra options are required for this offering.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ServiceDetailPage;

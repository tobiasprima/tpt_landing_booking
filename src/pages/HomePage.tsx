import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBusiness, useServices } from "../hooks";

const HomePage = () => {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data: business } = useBusiness(slug);
  const { data: services = [] } = useServices(slug);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <h1>{business?.settings.hero_title || business?.name || "Booking Template"}</h1>
        <p>{business?.settings.hero_subtitle || business?.short_description}</p>
        <div className="hero-actions">
          <Link className="primary-button" to={`/${slug}/catalog`}>
            {t("hero.cta")}
          </Link>
          <Link className="secondary-button" to={`/${slug}/booking`}>
            {t("hero.secondary")}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("home.featuredEyebrow")}</p>
            <h2>{t("home.featuredTitle")}</h2>
          </div>
          <Link className="text-link" to={`/${slug}/catalog`}>
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="card-grid">
          {services.slice(0, 6).map((service) => (
            <article className="card" key={service.id}>
              <div className="card-image">
                {service.cover_image_url ? (
                  <img alt={service.name} src={service.cover_image_url} />
                ) : (
                  <div className="image-placeholder">{service.name}</div>
                )}
              </div>
              <h3>{service.name}</h3>
              <p>{service.short_description}</p>
              <strong>
                Rp {service.price_amount.toLocaleString()} / {service.unit_label}
              </strong>
              <div className="hero-actions">
                <Link className="secondary-button" to={`/${slug}/services/${service.slug}`}>
                  {t("home.learnMore")}
                </Link>
                <Link className="primary-button" to={`/${slug}/booking/${service.slug}`}>
                  {t("home.bookNow")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section accent">
        <h2>{t("home.whyTitle")}</h2>
        <div className="three-col">
          <div>
            <h3>{t("home.valueOneTitle")}</h3>
            <p>{t("home.valueOneBody")}</p>
          </div>
          <div>
            <h3>{t("home.valueTwoTitle")}</h3>
            <p>{t("home.valueTwoBody")}</p>
          </div>
          <div>
            <h3>{t("home.valueThreeTitle")}</h3>
            <p>{t("home.valueThreeBody")}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

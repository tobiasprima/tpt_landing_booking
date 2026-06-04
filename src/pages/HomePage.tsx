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
        <h1>{business?.settings.hero_title || business?.name || "SewaMobil"}</h1>
        <p>{business?.settings.hero_subtitle || business?.short_description}</p>
        <div className="hero-actions">
          <Link className="primary-button" to={`/${slug}/booking`}>
            {t("hero.cta")}
          </Link>
          <Link className="secondary-button" to={`/${slug}/contact`}>
            {t("hero.secondary")}
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>Featured Cars</h2>
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
            </article>
          ))}
        </div>
      </section>

      <section className="section accent">
        <h2>Why choose us</h2>
        <div className="three-col">
          <div>
            <h3>Local and friendly</h3>
            <p>Built for Indonesian rental brands that need a warm, direct booking flow.</p>
          </div>
          <div>
            <h3>Real availability</h3>
            <p>Customers only book cars that still have units available for the requested time.</p>
          </div>
          <div>
            <h3>Fast booking</h3>
            <p>Choose the car, check the dates, confirm the order, and follow payment instructions.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

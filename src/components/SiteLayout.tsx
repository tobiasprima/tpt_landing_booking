import { Outlet, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBusiness } from "../hooks";

export const SiteLayout = () => {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data: business } = useBusiness(slug);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to={`/${slug}`}>
          {business?.name || "SewaMobil"}
        </Link>
        <nav className="site-nav">
          <Link to={`/${slug}`}>{t("nav.home")}</Link>
          <Link to={`/${slug}/booking`}>{t("nav.booking")}</Link>
          <Link to={`/${slug}/contact`}>{t("nav.contact")}</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

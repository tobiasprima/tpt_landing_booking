import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAvailabilityCheck,
  useBusiness,
  useCreateBooking,
  useServiceDetail,
  useServices,
} from "../hooks";
import { SelectedOptionSnapshotInput } from "../types";

const BookingPage = () => {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data: business } = useBusiness(slug);
  const { data: services = [] } = useServices(slug);
  const availability = useAvailabilityCheck(slug);
  const createBooking = useCreateBooking(slug);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const { data: serviceDetail } = useServiceDetail(slug, selectedServiceSlug);
  const [form, setForm] = useState({
    service_id: "",
    service_variant_id: "",
    service_package_id: "",
    quantity: 1,
    requested_start_at: "",
    requested_end_at: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    notes: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, SelectedOptionSnapshotInput>
  >({});

  const handleChange = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleServiceSelect = (serviceId: string, serviceSlug: string) => {
    setSelectedServiceSlug(serviceSlug);
    setSelectedOptions({});
    setForm((current) => ({
      ...current,
      service_id: serviceId,
      service_variant_id: "",
      service_package_id: "",
    }));
  };

  const handleOptionChange = (
    groupId: string,
    groupName: string,
    valueId: string,
    valueName: string
  ) => {
    const next = {
      ...selectedOptions,
      [groupId]: {
        service_option_group_id: groupId,
        service_option_value_id: valueId,
        group_name: groupName,
        value_name: valueName,
      },
    };
    setSelectedOptions(next);

    if (!serviceDetail) {
      return;
    }

    const matches = serviceDetail.variants.find((variant) => {
      const variantValues = variant.option_values || [];
      return variantValues.every(
        (optionValue) =>
          next[optionValue.service_option_group_id]?.service_option_value_id ===
          optionValue.service_option_value_id
      );
    });

    setForm((current) => ({
      ...current,
      service_variant_id: matches?.id || "",
    }));
  };

  const selectedVariant = serviceDetail?.variants.find(
    (variant) => variant.id === form.service_variant_id
  );
  const selectedPackage = serviceDetail?.packages.find(
    (pkg) => pkg.id === form.service_package_id
  );
  const matrixPrice = serviceDetail?.matrix_pricing.find(
    (price) =>
      price.service_variant_id === form.service_variant_id &&
      price.service_package_id === form.service_package_id
  );
  const displayedPrice =
    matrixPrice?.price_amount ??
    selectedPackage?.price_amount ??
    selectedVariant?.price_override_amount ??
    services.find((service) => service.id === form.service_id)?.price_amount ??
    0;

  return (
    <main className="section">
      <h1>{t("booking.title")}</h1>
      <div className="booking-layout">
        <section className="card">
          <h2>Select car</h2>
          <div className="service-list">
            {services.map((service) => (
              <button
                className={`service-option ${form.service_id === service.id ? "selected" : ""}`}
                key={service.id}
                onClick={() => handleServiceSelect(service.id, service.slug)}
                type="button"
              >
                <span>{service.name}</span>
                <strong>Rp {service.price_amount.toLocaleString()}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          {serviceDetail && (
            <>
              <h2>{serviceDetail.service.name}</h2>
              <p>{serviceDetail.service.short_description}</p>
              {serviceDetail.option_groups.map((group) => (
                <label key={group.id} className="full-width">
                  {group.name}
                  <select
                    value={selectedOptions[group.id]?.service_option_value_id || ""}
                    onChange={(event) => {
                      const value = group.values?.find(
                        (item) => item.id === event.target.value
                      );
                      if (!value) {
                        return;
                      }
                      handleOptionChange(group.id, group.name, value.id, value.name);
                    }}
                  >
                    <option value="">Select {group.name}</option>
                    {(group.values || []).map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              {serviceDetail.packages.length > 0 && (
                <label className="full-width">
                  Package
                  <select
                    value={form.service_package_id}
                    onChange={(event) =>
                      handleChange("service_package_id", event.target.value)
                    }
                  >
                    <option value="">Select package</option>
                    {serviceDetail.packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <p className="status-message">
                Estimated price: Rp {displayedPrice.toLocaleString()}
              </p>
            </>
          )}

          <h2>Schedule & customer</h2>
          <div className="field-grid">
            <label>
              Quantity
              <input
                min="1"
                type="number"
                value={form.quantity}
                onChange={(event) => handleChange("quantity", event.target.value)}
              />
            </label>
            <label>
              Pickup
              <input
                type="datetime-local"
                value={form.requested_start_at}
                onChange={(event) => handleChange("requested_start_at", event.target.value)}
              />
            </label>
            <label>
              Return
              <input
                type="datetime-local"
                value={form.requested_end_at}
                onChange={(event) => handleChange("requested_end_at", event.target.value)}
              />
            </label>
            <label>
              Name
              <input value={form.customer_name} onChange={(event) => handleChange("customer_name", event.target.value)} />
            </label>
            <label>
              Phone / WhatsApp
              <input value={form.customer_phone} onChange={(event) => handleChange("customer_phone", event.target.value)} />
            </label>
            <label>
              Email
              <input value={form.customer_email} onChange={(event) => handleChange("customer_email", event.target.value)} />
            </label>
            <label className="full-width">
              Notes
              <textarea value={form.notes} onChange={(event) => handleChange("notes", event.target.value)} />
            </label>
          </div>

          <div className="hero-actions">
            <button
              className="secondary-button"
              onClick={() =>
                availability.mutate({
                  service_id: form.service_id,
                  service_variant_id: form.service_variant_id,
                  requested_start_at: new Date(form.requested_start_at).toISOString(),
                  requested_end_at: new Date(form.requested_end_at).toISOString(),
                })
              }
              type="button"
            >
              {t("booking.checkAvailability")}
            </button>
            <button
              className="primary-button"
              onClick={() =>
                createBooking.mutate({
                  ...form,
                  quantity: Number(form.quantity) || 1,
                  selected_options_snapshot: Object.values(selectedOptions),
                  requested_start_at: new Date(form.requested_start_at).toISOString(),
                  requested_end_at: new Date(form.requested_end_at).toISOString(),
                })
              }
              type="button"
            >
              {t("booking.submit")}
            </button>
          </div>

          {availability.data && (
            <p className="status-message">
              {availability.data.available
                ? `Available units: ${availability.data.available_unit_count}`
                : availability.data.message}
            </p>
          )}
          {createBooking.isSuccess && (
            <p className="status-message success">
              Booking created. {business?.settings.booking_terms || "Please follow the payment instructions from the business."}
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default BookingPage;

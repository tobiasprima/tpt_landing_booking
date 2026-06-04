import { useMutation, useQuery } from "react-query";
import {
  checkAvailability,
  createBooking,
  getBusiness,
  getServiceDetail,
  getServices,
} from "./api";
import { BookingInput } from "./types";

export const useBusiness = (slug: string) =>
  useQuery(["business", slug], () => getBusiness(slug), { enabled: !!slug });

export const useServices = (slug: string) =>
  useQuery(["public-services", slug], () => getServices(slug), { enabled: !!slug });

export const useServiceDetail = (slug: string, serviceSlug: string) =>
  useQuery(["public-service-detail", slug, serviceSlug], () => getServiceDetail(slug, serviceSlug), {
    enabled: !!slug && !!serviceSlug,
  });

export const useAvailabilityCheck = (slug: string) =>
  useMutation(
    (
      input: Pick<
        BookingInput,
        "service_id" | "service_variant_id" | "requested_start_at" | "requested_end_at"
      >
    ) => checkAvailability(slug, input)
  );

export const useCreateBooking = (slug: string) =>
  useMutation((input: BookingInput) => createBooking(slug, input));

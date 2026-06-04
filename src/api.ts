import axios from "axios";
import {
  AvailabilityResponse,
  BookingInput,
  Business,
  Service,
  ServiceDetailResponse,
} from "./types";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const publicClient = axios.create({ baseURL: `${apiBaseUrl}/api/v1/public` });

export const getBusiness = async (slug: string): Promise<Business> => {
  const { data } = await publicClient.get(`/businesses/${slug}`);
  return data;
};

export const getServices = async (slug: string): Promise<Service[]> => {
  const { data } = await publicClient.get(`/businesses/${slug}/services`);
  return data;
};

export const getServiceDetail = async (
  slug: string,
  serviceSlug: string
): Promise<ServiceDetailResponse> => {
  const { data } = await publicClient.get(`/businesses/${slug}/services/${serviceSlug}`);
  return data;
};

export const checkAvailability = async (
  slug: string,
  input: Pick<
    BookingInput,
    "service_id" | "service_variant_id" | "requested_start_at" | "requested_end_at"
  >
): Promise<AvailabilityResponse> => {
  const { data } = await publicClient.post(`/businesses/${slug}/availability/check`, input);
  return data;
};

export const createBooking = async (slug: string, input: BookingInput) => {
  const { data } = await publicClient.post(`/businesses/${slug}/bookings`, input);
  return data;
};

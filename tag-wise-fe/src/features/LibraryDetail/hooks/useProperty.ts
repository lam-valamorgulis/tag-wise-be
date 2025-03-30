import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiDetailProperty } from "../../../utils/axios";

export type PropertyDetail = {
  country: string;
  site_code: string;
  shopType: string;
  rhq: string;
  subHq: string;
  url: string;
  section: string;
};

export type Property = {
  propertySiteCode: PropertyDetail;
  propertyName: string;
};

export default function useProperty() {
  const { propertyId } = useParams<{
    propertyId: string;
  }>();

  const {
    data: propertyDetail,
    isLoading: isPropertyLoading,
    error: propertyError,
  } = useQuery<Property, Error>({
    queryKey: ["propertyDetail", propertyId],
    queryFn: () => apiDetailProperty(propertyId ?? ""),
    enabled: !!propertyId,
  });

  return {
    propertyDetail,
    isPropertyLoading,
    propertyError,
  };
}

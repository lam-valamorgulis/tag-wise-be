import axios from "axios";
interface CommentSearchParams {
  searchTerm?: string;
  category?: string;
  page?: number;
  limit?: number;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 🔹 Centralized API instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 🔹 Error Handling Function
const handleError = (error: unknown) => {
  console.error("API Error:", error);
  throw error;
};

// 🔹 API Functions
const apiSearchLibrary = async (data: {
  libraryName: string;
  propertyName: string;
}) =>
  apiClient
    .post("/library/search", data)
    .then((res) => res.data)
    .catch(handleError);

const apiCreateLibrary = async (data: {
  propertiesId: string[];
  libraryName: string;
}) =>
  apiClient
    .post("/library/bulk_create", data)
    .then((res) => res.data)
    .catch(handleError);

const apiSearchProperty = async (data: { propertyName: string }) =>
  apiClient
    .post("/property/search", data)
    .then((res) => res.data)
    .catch(handleError);

const apiDetailProperty = async (propertyId: string) =>
  apiClient
    .get(`/property/detail/${propertyId}`)
    .then((res) => res.data)
    .catch(handleError);

const apiSummaryLibrary = async (libraryId: string) =>
  apiClient
    .get(`/library/${libraryId}/summary`)
    .then((res) => res.data)
    .catch(handleError);

const apiGetDataElementsLibrary = async (libraryId: string) =>
  apiClient
    .get(`/library/${libraryId}/data_element`)
    .then((res) => res.data)
    .catch(handleError);

const apiGetExtensionsLibrary = async (libraryId: string) =>
  apiClient
    .get(`/library/${libraryId}/extension`)
    .then((res) => res.data)
    .catch(handleError);

const apiRuleList = async (libraryId: string) =>
  apiClient
    .get(`/rule/${libraryId}/rules`)
    .then((res) => res.data)
    .catch(handleError);

const apiRuleInProduction = async (ruleId: string) =>
  apiClient
    .get(`/rule/${ruleId}/in_production`)
    .then((res) => res.data)
    .catch(handleError);

const apiValidateRule = async (
  ruleId: string,
  data: {
    isShopSection: boolean;
    isRequiredConsent: boolean;
    keyword: string[];
    ruleName: string;
  }
) =>
  apiClient
    .post(`/rule/${ruleId}/validate`, data)
    .then((res) => res)
    .catch(handleError);

const apiGetListComment = async ({
  searchTerm,
  category,
  page = 1,
  limit = 5,
}: CommentSearchParams) =>
  apiClient
    .get("/comments/search", {
      params: {
        ...(searchTerm && { searchTerm: encodeURIComponent(searchTerm) }),
        ...(category && { category: encodeURIComponent(category) }),
        page,
        limit,
      },
    })
    .then((res) => res.data.data)
    .catch(handleError);

const apiCreateComment = async (data: {
  category: string;
  purpose: string;
  comment: string;
  createdBy: string;
}) =>
  apiClient
    .post("/comments", data)
    .then((res) => res.data)
    .catch(handleError);

const apiEditComment = async (
  commentId: string,
  data: {
    category: string;
    comment: string;
    purpose: string;
    createdBy: string;
  }
) =>
  apiClient
    .put(`/comments/${commentId}`, data)
    .then((res) => res.data)
    .catch(handleError);

const apiDeleteComment = async (commentId: string) =>
  apiClient
    .delete(`/comments/${commentId}`)
    .then((res) => res.data)
    .catch(handleError);

export {
  apiCreateComment,
  apiCreateLibrary,
  apiDeleteComment,
  apiDetailProperty,
  apiEditComment,
  apiGetDataElementsLibrary,
  apiGetExtensionsLibrary,
  apiGetListComment,
  apiRuleInProduction,
  apiRuleList,
  apiSearchLibrary,
  apiSearchProperty,
  apiSummaryLibrary,
  apiValidateRule,
};

import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiLibrary = axios.create({
  baseURL: BASE_URL + "/library",
});

const apiProperty = axios.create({
  baseURL: BASE_URL + "/property",
});

const apiRule = axios.create({
  baseURL: BASE_URL + "/rule",
});

const apiComment = axios.create({
  baseURL: BASE_URL + "/comments",
});

const apiAdobeProfile = axios.create({
  baseURL: BASE_URL + "/account_profile",
});

const apiSearchLibrary = async (data: {
  libraryName: string;
  propertyName: string;
}) => {
  try {
    const response = await apiLibrary.post("/search", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiCreateLibrary = async (data: {
  propertiesId: string[];
  libraryName: string;
}) => {
  try {
    const response = await apiLibrary.post("/bulk_create", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiSearchProperty = async (data: { propertyName: string }) => {
  try {
    const response = await apiProperty.post("/search", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiDetailProperty = async (propertyId: string) => {
  try {
    const response = await apiProperty.get("/detail/" + propertyId);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiSummaryLibrary = async (libraryId: string) => {
  try {
    const response = await apiLibrary.get(`/${libraryId}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiRuleList = async (libraryId: string) => {
  try {
    const response = await apiRule.get(`/${libraryId}/rules`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiValidateRule = async (
  ruleId: string,
  data: {
    ruleName: string;
    isEU: boolean;
    isHqRule: boolean;
    keyWord: string[];
    isShopSection: boolean;
  }
) => {
  try {
    const response = await apiRule.post(`/${ruleId}/validate`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiGetListComment = async (hashtag?: string, category?: string) => {
  try {
    const response = await apiComment.get("/", {
      params: {
        ...(hashtag ? { hashtag: encodeURIComponent(hashtag) } : {}),
        ...(category ? { category: encodeURIComponent(category) } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const apiCreateComment = async (data: {
  category: string;
  commentDetail: string;
  hashtag?: string;
}) => {
  try {
    const response = await apiComment.post(`/`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiEditComment = async (
  commentId: string,
  data: {
    category: string;
    commentDetail: string;
    hashtag?: string;
  }
) => {
  try {
    const response = await apiComment.put(`/${commentId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiDeleteComment = async (commentId: string) => {
  try {
    const response = await apiComment.delete(`/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const apiSearchProfile = async (data: {
  siteCode: string;
  subsidinary: string;
}) => {
  try {
    const response = await apiAdobeProfile.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export {
  apiCreateComment,
  apiCreateLibrary,
  apiDeleteComment,
  apiDetailProperty,
  apiEditComment,
  apiGetListComment,
  apiLibrary,
  apiRuleList,
  apiSearchLibrary,
  apiSearchProfile,
  apiSearchProperty,
  apiSummaryLibrary,
  apiValidateRule,
};

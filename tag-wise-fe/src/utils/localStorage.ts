export const addAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
};

export const getAccessTokenFromLocalStorage = () => {
  const result = localStorage.getItem("accessToken");
  const accessToken = result ? JSON.parse(result) : null;
  return accessToken;
};

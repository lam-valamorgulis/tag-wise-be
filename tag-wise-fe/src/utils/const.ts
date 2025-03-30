import { theme } from "antd";

export const THEME_OPTIONS = {
  components: {
    Typography: {
      titleMarginBottom: "0",
    },
    Table: {
      borderColor: "rgb(203,213,225)",
    },
  },
  token: {
    fontSize: 14,
    sizeStep: 4,
  },
  algorithm: theme.compactAlgorithm,
};

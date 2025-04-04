import { CSSProperties } from "react";

export const commonButtonStyle: CSSProperties = {
  fontSize: "12px",
  padding: "0 8px",
  margin: "0 6px",
  height: "auto",
  borderColor: "blue",
  color: "#333",
} as const;

export const commonTextStyle: CSSProperties = {
  fontSize: "12px",
  margin: "0 4px",
  color: "#333",
} as const;

export const productionNumberStyle: CSSProperties = {
  color: "#52c41a", // Green for production revision number
} as const;

export const currentNumberStyle: CSSProperties = {
  color: "#fa8c16", // Orange for current revision number
} as const;

export const revisionContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  width: "100%",
} as const;

export const revisionInfoStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  minWidth: "180px",
} as const;

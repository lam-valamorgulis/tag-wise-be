// styles.ts
export const containerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "5px",
  padding: "5px",
  fontFamily: "monospace",
  fontSize: "10px",
  backgroundColor: "#f0f0f0",
};

export const sectionStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "3px",
  padding: "5px",
  margin: "2px",
  border: "1px solid #ddd",
};

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 5px 0",
  padding: "3px",
  fontFamily: "monospace",
};

export const testCaseStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#333",
  margin: "3px 0",
  padding: "3px",
  fontFamily: "monospace",
  wordBreak: "break-word",
};

export const testItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center", // vertical centering
  gap: "8px",
  width: "100%",
  margin: "6px 0",
};

export const subHeaderStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "bold",
  color: "#444",
  margin: "5px 0 3px 0",
  fontFamily: "monospace",
};

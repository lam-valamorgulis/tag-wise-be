// RenderHelpers.tsx

export const renderStatus = (isValid?: boolean) => (
  <span
    style={{
      color: isValid ? "#090" : "#900",
      marginLeft: "4px",
      fontSize: "10px",
      fontFamily: "monospace",
      whiteSpace: "nowrap",
    }}
  >
    {isValid ? "✓ YES" : "✗ NO"}
  </span>
);

export const renderNumber = (items: number | undefined | string) => {
  if (items === undefined || typeof items !== "number") return "";
  const color = items < 50 ? "#900" : "#090";
  return (
    <li style={{ color, marginLeft: "10px", listStyleType: "none" }}>
      {items.toString()}
    </li>
  );
};

export const renderList = (items: string[] | undefined) => {
  if (!items || !Array.isArray(items) || items.length === 0) return "";
  return (
    <ul style={{ paddingLeft: "10px", margin: "0" }}>
      {items.map((item, index) => (
        <li
          key={index}
          style={{ color: "#090", marginLeft: "10px", listStyleType: "none" }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export const renderMatchString = (
  strings?: string[],
  inValidValues?: string[]
) => {
  console.log(strings, inValidValues);
  if (!strings || !Array.isArray(strings)) return <span>-</span>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {strings.map((str, index) => (
        <span
          key={index}
          style={{
            color: !inValidValues?.includes(str) ? "#090" : "#900",
            marginLeft: "4px",
            fontSize: "10px",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}
        >
          {str}
        </span>
      ))}
    </div>
  );
};

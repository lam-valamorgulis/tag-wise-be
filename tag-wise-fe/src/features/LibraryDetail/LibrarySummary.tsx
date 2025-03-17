import { Row, Typography } from "antd";
import LibrarySummaryPieChart from "./LibrarySummaryPieChart";
import type { LibrarySummary } from "./useLibrary";

function LibrarySummary({
  librarySummary,
}: {
  librarySummary: LibrarySummary;
}) {
  return (
    <Row className="h-full" style={{ position: "relative" }}>
      <LibrarySummaryPieChart librarySummary={librarySummary} />
      <Typography.Title
        level={5}
        style={{
          position: "absolute",
          // bottom: 0,
          left: 0,
          margin: 0,
          // transform: "translateY(%)",
        }}
      >
        Total Rules : {librarySummary.total}
      </Typography.Title>
    </Row>
  );
}

export default LibrarySummary;

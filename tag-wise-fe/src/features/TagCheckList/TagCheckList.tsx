import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table } from "antd";
import { CHECKLISTDATA } from "../../utils/const";

const columns = [
  { title: "Item", dataIndex: "item", key: "item", width: 150 },
  { title: "Result", dataIndex: "result", key: "result", width: 150 },
];

interface ChecklistData {
  item: string;
  result: string;
}

const copyToClipboard = (data: ChecklistData[]) => {
  const htmlContent = `
    <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px;">Item</th>
          <th style="border: 1px solid black; padding: 5px;">Result</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (row) =>
              `<tr>
                <td style="border: 1px solid black; padding: 5px;">${row.item}</td>
                <td style="border: 1px solid black; padding: 5px;">${row.result}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const clipboardItem = new ClipboardItem({ "text/html": blob });

  navigator.clipboard.write([clipboardItem]).catch((err) => {
    console.error("Error copying table:", err);
  });
};

const TagChecklist = () => {
  return (
    <Row className="w-full flex justify-between">
      {Object.entries(CHECKLISTDATA).map(([key, data]) => (
        <Col
          span={Math.floor(24 / Object.keys(CHECKLISTDATA).length)}
          key={key}
        >
          {/* Title & Copy Button on Same Row */}
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <h3
              style={{ margin: 0, fontSize: "12px" }}
              className="text-red-600 font-semibold"
            >
              {key === "newTagChecklist"
                ? "New Tag Checklist"
                : key === "newUpdateRuleChecklist"
                ? "New/Update Rule Checklist"
                : key === "dateExtensionRuleChecklist"
                ? "Date Extension Rule Checklist"
                : key === "checkout"
                ? "Checkout 2.0 Checklist"
                : "Disable Rules"}
            </h3>
            <Button
              type="default"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(data)}
            >
              Copy
            </Button>
          </Space>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            rowKey="item"
            style={{
              fontSize: "6px",
              width: "100%",
            }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TagChecklist;

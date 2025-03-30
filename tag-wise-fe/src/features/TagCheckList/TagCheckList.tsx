/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table } from "antd";

const checklistData = {
  newTagChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [New Tag]",
    },
    { item: "Issue Type", result: "Enhancement Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Status (AS-IS)", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "DataTrue Tag Audit Report result", result: "" },
    { item: "① Result URL", result: "" },
    { item: "② Result Screenshot", result: "" },
    { item: "Local Rule Monitoring Excel file", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
  ],
  newUpdateRuleChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [New/update Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Status (TO-BE)", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "DataTrue Tag Audit Report result", result: "" },
    { item: "① Result URL", result: "" },
    { item: "② Result Screenshot", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
    { item: "Test Result screenshot image file", result: "" },
    { item: "Local Rule Monitoring Excel file", result: "" },
    { item: "Event - NOT Dom Ready", result: "" },
    { item: "Query Path / Value Comparison", result: "" },
    { item: "Condition - Date Range", result: "" },
    { item: "Script - JavaScript", result: "" },
    { item: "Integration Result", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
    { item: "Ticket Link of New Tag Approval", result: "Ticket ID" },
  ],
  dateExtensionRuleChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [Date Extension Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Current Expiration Date", result: "" },
    { item: "Requested Expiration Date", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
    { item: "Event - Window Loaded / Click", result: "" },
    { item: "Query Path / Value Comparison", result: "" },
    { item: "Condition - Date Range", result: "" },
    { item: "Actions", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
  ],
  additionalChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [Disable Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
  ],
};

const columns = [
  { title: "Item", dataIndex: "item", key: "item", width: 250 },
  { title: "Result", dataIndex: "result", key: "result" },
];

const copyToClipboard = (data: any[]) => {
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
    <Row gutter={16}>
      {Object.entries(checklistData).map(([key, data]) => (
        <Col span={6} key={key}>
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
                : "Additional Checklist"}
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
              fontSize: "8px",
            }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TagChecklist;

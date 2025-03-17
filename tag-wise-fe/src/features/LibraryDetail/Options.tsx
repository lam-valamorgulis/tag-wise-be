import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Input, List, Row, Tag } from "antd";
import { useState } from "react";

const data = [
  "1. HQ Rule (HQ) or Non-Media (Beusable,Sprinklr,Medallia,TrustArc):Bypass: Date range within 2 months, Rules Order >= 50",
  "2. Shop Section : Force to check Event : Data Element Change",
  "3. Cookies Check: Force to check Condition: TrustArc",
  "4. Keywords Check: Force to check Condition and Actions: Path and Query string and all Custom code are contained keyword",
];

type Options = {
  isHqRules: boolean;
  isShopSection: boolean;
  isRequiredConsent: boolean;
  keyword: string[];
};

function Options({
  onOptionsChange,
  options,
}: {
  onOptionsChange: (options: Options) => void;
  options: Options;
}) {
  const [keywordInput, setKeywordInput] = useState(""); // State for current keyword input
  const [keywordsList, setKeywordsList] = useState(options.keyword); // State for the list of keywords

  const handleChange = (key: string, value: boolean | string | string[]) => {
    const newOptions = { ...options, [key]: value };
    onOptionsChange(newOptions);
  };

  const handleAddKeyword = () => {
    if (keywordInput && !keywordsList.includes(keywordInput)) {
      const updatedKeywords = [...keywordsList, keywordInput];
      setKeywordsList(updatedKeywords);
      handleChange("keyword", updatedKeywords);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (removedKeyword: string) => {
    const updatedKeywords = keywordsList.filter((kw) => kw !== removedKeyword);
    setKeywordsList(updatedKeywords);
    handleChange("keyword", updatedKeywords);
  };

  return (
    <Row gutter={16} align="middle">
      {/* First Column: Options checkbox */}
      <Col span={6}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Checkbox
            checked={options.isHqRules}
            onChange={(e) => handleChange("isHqRules", e.target.checked)}
          >
            1. Is Head Quarter Rule (HQ) or Non-Media Tag
          </Checkbox>
          <Checkbox
            checked={options.isShopSection}
            onChange={(e) => handleChange("isShopSection", e.target.checked)}
          >
            2. Is Shop Section
          </Checkbox>
          <Checkbox
            checked={options.isRequiredConsent}
            onChange={(e) =>
              handleChange("isRequiredConsent", e.target.checked)
            }
          >
            3. Is Required Cookies Check
          </Checkbox>
        </div>
      </Col>
      <Divider
        type="vertical"
        style={{ borderColor: "#e5e7eb", height: "150px" }}
      />

      {/* Second Column: Keyword Input and Button */}
      <Col span={5}>
        {/* Display Keywords as Tags */}
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <p>4. Keyword:</p>
          {keywordsList.map((keyword) => (
            <Tag
              key={keyword}
              color="blue"
              closable
              onClose={() => handleRemoveKeyword(keyword)}
              closeIcon={<CloseCircleOutlined />}
            >
              {keyword}
            </Tag>
          ))}
        </div>

        {/* Input and Button Row */}
        <Row gutter={8}>
          <Col span={16}>
            <Input
              placeholder="Enter keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onPressEnter={handleAddKeyword}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={handleAddKeyword} block>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
      <Divider
        type="vertical"
        style={{ borderColor: "#e5e7eb", height: "150px" }}
      />

      {/* Third Column: Legend */}
      <Col span={12}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p className="underline">Notes:</p>
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{ fontSize: "10px", width: "100%", padding: "2px" }}
              >
                {item}
              </List.Item>
            )}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Options;

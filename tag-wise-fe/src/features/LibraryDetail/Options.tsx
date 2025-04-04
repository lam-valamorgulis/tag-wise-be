import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import DividerComponent from "../../components/DividerComponent";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";

type Options = {
  isShopSection: boolean;
  isRequiredConsent: boolean;
  keywords: string[];
};

function Options({
  onOptionsChange,
  options,
}: {
  onOptionsChange: (options: Options) => void;
  options: Options;
}) {
  const { propertyName } = useGeneralInformation();

  const [keywordInput, setKeywordInput] = useState("");
  const [keywordsList, setKeywordsList] = useState<string[]>(options.keywords);
  const handleChange = (key: string, value: boolean | string[]) => {
    const newOptions = { ...options, [key]: value };
    onOptionsChange(newOptions);
  };
  useEffect(() => {
    if (
      propertyName?.toLowerCase().includes("shop") &&
      !options.isShopSection
    ) {
      handleChange("isShopSection", true);
    }
  }, [propertyName]);

  const handleAddKeyword = () => {
    if (keywordInput && !keywordsList.includes(keywordInput)) {
      const updatedKeywords = [...keywordsList, keywordInput];
      setKeywordsList(updatedKeywords);
      handleChange("keywords", updatedKeywords);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (removedKeyword: string) => {
    const updatedKeywords = keywordsList.filter((kw) => kw !== removedKeyword);
    setKeywordsList(updatedKeywords);
    handleChange("keyword", updatedKeywords);
  };

  return (
    <Row gutter={16} align="middle" style={{ width: "100%", margin: 0 }}>
      {/* First Column: Checkboxes */}
      <Col xs={24} md={8}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Checkbox
            checked={
              propertyName?.toLowerCase().includes("shop") ||
              options.isShopSection
            }
            disabled={propertyName?.toLowerCase().includes("shop")}
            onChange={(e) => handleChange("isShopSection", e.target.checked)}
          >
            1. Shop Section
          </Checkbox>
          <Checkbox
            checked={options.isRequiredConsent}
            onChange={(e) =>
              handleChange("isRequiredConsent", e.target.checked)
            }
          >
            2. EU TrustArc Consent
          </Checkbox>
        </div>
      </Col>

      {/* Vertical Line */}
      <DividerComponent />

      {/* Second Column: Keyword Input and Tags */}
      <Col xs={24} md={12}>
        <div style={{ marginBottom: "10px" }}>
          <p>3. Keyword:</p>
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

        <Row gutter={8}>
          <Col span={18}>
            <Input
              placeholder="Enter keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onPressEnter={handleAddKeyword}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={handleAddKeyword} block>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Options;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Col, message, Row, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import DividerComponent from "../../components/DividerComponent";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import {
  apiGetDataElementsLibrary,
  apiGetExtensionsLibrary,
} from "../../utils/axios";

interface ValidationStatusProps {
  passed: boolean;
}

const ValidationStatus: React.FC<ValidationStatusProps> = ({ passed }) => (
  <Typography.Text
    style={{
      color: passed ? "#090" : "#900",
      fontWeight: 600,
      marginLeft: "4px",
    }}
  >
    {passed ? "Pass" : "Fail"}
  </Typography.Text>
);
function ExtensionAndDataElements() {
  const { libraryTotal, rulesListName } = useGeneralInformation();
  const { libraryId } = useParams<{
    libraryId: string;
  }>();

  const {
    data: dataElementLibrary,
    isLoading: isGettingDataElementLoading,
    error: dataElementError,
  } = useQuery<any, Error>({
    queryKey: ["dataElementLibrary", libraryId],
    queryFn: () => apiGetDataElementsLibrary(libraryId ?? ""),
    enabled: !!libraryId,
  });

  const {
    data: extensionLibrary,
    isLoading: isGettingExtensionLoading,
    error: extensionError,
  } = useQuery<any, Error>({
    queryKey: ["extensionLibrary", libraryId],
    queryFn: () => apiGetExtensionsLibrary(libraryId ?? ""),
    enabled: !!libraryId,
  });

  if (isGettingDataElementLoading || isGettingExtensionLoading) {
    return <Spin size="large" />;
  }

  if (dataElementError || extensionError) {
    return <Alert type="error" message="Failed to fetch library data" />;
  }

  const handleCopyRuleNames = async () => {
    try {
      if (!rulesListName?.length) {
        message.warning("No rules to copy");
        return;
      }

      await navigator.clipboard.writeText(rulesListName.join(","));

      message.success({
        content: "Rules list copied to clipboard",
        duration: 2,
        style: {
          marginTop: "6vh",
        },
      });
    } catch (error) {
      message.error("Failed to copy rules list");
      console.error("Copy failed:", error);
    }
  };

  return (
    <Row gutter={16} align="middle" style={{ width: "100%", margin: 0 }}>
      {/* Vertical Line */}
      <DividerComponent />

      {/* First Column: Checkboxes */}
      <Col xs={24} md={12}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography.Title level={5} style={{ marginBottom: 5 }}>
            Data Elements and Extension
          </Typography.Title>
          <div>
            <Typography.Text strong>Not</Typography.Text> Modify or Create:
          </div>
          <Row className="px-4">
            <li>Data Elements:</li>
            <ValidationStatus
              passed={Boolean(!dataElementLibrary.libraryDataElement?.length)}
            />
          </Row>
          <Row className="px-4">
            <li>Extension:</li>
            <ValidationStatus
              passed={Boolean(!extensionLibrary?.libraryExtension?.length)}
            />
          </Row>
        </div>
      </Col>
      {/* Vertical Line */}
      <DividerComponent />
      <Col xs={24} md={8}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Col
            xs={24}
            md={24}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              textAlign: "center",
              paddingBottom: "3px",
            }}
          >
            <Typography.Title level={5} type="danger">
              Total Rules: {libraryTotal}
            </Typography.Title>
          </Col>
          <Col
            xs={24}
            md={24}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              textAlign: "center",
              paddingBottom: "3px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Typography.Title level={5} type="danger" style={{ margin: 0 }}>
                Copy list rule
              </Typography.Title>
              <CopyOutlined
                onClick={handleCopyRuleNames}
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#ff4d4f",
                  transition: "all 0.3s",
                }}
                className="hover:text-blue-500"
              />
            </div>
          </Col>
        </div>
      </Col>
    </Row>
  );
}

export default ExtensionAndDataElements;

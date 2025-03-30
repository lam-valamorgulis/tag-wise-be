import { Col, Row } from "antd";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import useLibrary from "./hooks/useLibrary";
import useProperty from "./hooks/useProperty";

function GeneralInfo() {
  const { setLibraryTotal } = useGeneralInformation();

  const { propertyDetail: property } = useProperty();
  const { librarySummary } = useLibrary();

  if (!property?.propertySiteCode || !librarySummary) {
    return <div>No information details available</div>;
  }

  setLibraryTotal(librarySummary.total);

  const {
    subHq = "",
    site_code = "",
    shopType = "",
    url = "",
    country = "",
    section = "",
  } = property.propertySiteCode;

  const { propertyName } = property;

  return (
    <Row
      gutter={[16, 16]}
      style={{ width: "100%", margin: 0, flexWrap: "wrap" }}
    >
      {/* First Column */}
      <Col
        xs={22}
        sm={10}
        md={4}
        style={{
          borderRight: "1px solid #ddd",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Sub</Col>
          <Col span={16}>{subHq}</Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Shop Type</Col>
          <Col span={16}>{shopType}</Col>
        </Row>
      </Col>

      {/* Second Column */}
      <Col
        xs={26}
        sm={14}
        md={8}
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Section</Col>
          <Col span={16} className="text-red-500">
            {section}
          </Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Property Name</Col>
          <Col span={16} className="text-red-500">
            {propertyName}
          </Col>
        </Row>
      </Col>

      {/* Third Column */}
      <Col
        xs={26}
        sm={14}
        md={8}
        style={{
          borderRight: "1px solid #ddd",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Site code</Col>
          <Col span={16} className="text-red-500">
            {site_code}
          </Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Library Name</Col>
          <Col span={16} className="text-red-500">
            {librarySummary.libraryName}
          </Col>
        </Row>
      </Col>

      {/* Fourth Column */}
      <Col
        xs={22}
        sm={10}
        md={4}
        style={{
          borderRight: "1px solid #ddd",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>URL</Col>
          <Col
            span={16}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align="middle">
          <Col span={8}>Country</Col>
          <Col span={16}>{country}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default GeneralInfo;

import { Col, Row } from "antd";
import type { Property } from "./useProperty";

function Property({ property }: { property: Property }) {
  if (!property?.propertySiteCode) {
    return <div>No property details available</div>;
  }

  const {
    subHq = "",
    site_code = "",
    shopType = "",
    url = "",
    rhq = "",
    country = "",
  } = property.propertySiteCode;

  return (
    <Row className="h-full">
      <Col xs={24} sm={12} className="border-r pr-4">
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Subsidinary</Col>
          <Col span={16}>{subHq}</Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Site code</Col>
          <Col span={16}>{site_code}</Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>Shop Type</Col>
          <Col span={16}>{shopType}</Col>
        </Row>
      </Col>
      <Col xs={24} sm={12} className="border-r px-4">
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>URL</Col>
          <Col span={16}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </Col>
        </Row>
        <Row className="border-b border-gray-200 h-10" align={"middle"}>
          <Col span={8}>rHQ</Col>
          <Col span={16}>{rhq}</Col>
        </Row>
        <Row className="h-10" align={"middle"}>
          <Col span={8}>Country</Col>
          <Col span={16}>{country}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Property;

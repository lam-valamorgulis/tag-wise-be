import { Col, Divider } from "antd";

function DividerComponent() {
  return (
    <>
      <Col xs={0} md={2} style={{ display: "flex", justifyContent: "center" }}>
        <Divider type="vertical" style={{ height: "150px" }} />
      </Col>
    </>
  );
}

export default DividerComponent;

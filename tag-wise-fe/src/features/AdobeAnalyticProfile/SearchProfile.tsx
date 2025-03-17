import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

export type FieldType = {
  siteCode?: string;
  subsidinary?: string; // consider renaming to "subsidiary"
};

function SearchProfile({
  isSearchingProfile,
  onSearch,
}: {
  isSearchingProfile: boolean;
  onSearch: (searchData: FieldType) => void;
}) {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { siteCode, subsidinary } = values;
    onSearch({
      siteCode: siteCode ? siteCode.trim() : "",
      subsidinary: subsidinary ? subsidinary.trim() : "",
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: "100%", padding: "20px", marginTop: "40px" }}>
      <Form
        name="searchProfile"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="siteCode"
          initialValue="vn"
          label="Site Code"
          rules={[{ required: true, message: "Please input your site code" }]}
        >
          <Input
            placeholder="Site Code"
            style={{ fontSize: "14px", height: "40px" }}
            className="ml-2"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="subsidinary"
          initialValue="SEA HQ"
          label="Subsidinary"
          rules={[{ required: true, message: "Please input your subsidinary" }]}
        >
          <Input
            placeholder="Subsidinary"
            style={{ fontSize: "14px", height: "40px" }}
            className="ml-2"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            disabled={isSearchingProfile}
            type="primary"
            htmlType="submit"
            style={{ height: "40px", fontSize: "14px" }}
            className="ml-2"
          >
            Get Profiles
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchProfile;

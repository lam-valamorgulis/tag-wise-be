import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

export type FieldType = {
  libraryName?: string;
  propertyName?: string;
};

function SearchLibrary({
  isSearching,
  onSearch,
}: {
  isSearching: boolean;
  onSearch: (searchData: FieldType) => void;
}) {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { libraryName, propertyName } = values;
    onSearch({
      libraryName: libraryName ? libraryName.trim() : "",
      propertyName: propertyName ? propertyName.trim() : "",
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
        name="searchLibrary"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="libraryName"
          initialValue="20250203 DIA Cheil_Date Range_1"
          label="Library Name"
          rules={[
            { required: true, message: "Please input your Library Name!" },
          ]}
        >
          <Input
            placeholder="Library Name"
            style={{ fontSize: "14px", height: "40px" }}
            className="ml-2"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="propertyName"
          initialValue="ZP6_HU-Hungary(EU SEH) WebSDK"
          label="Property Name"
          rules={[
            { required: true, message: "Please input your Property Name!" },
          ]}
        >
          <Input
            placeholder="Property Name"
            style={{ fontSize: "14px", height: "40px" }}
            className="ml-2"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            disabled={isSearching}
            type="primary"
            htmlType="submit"
            style={{
              height: "40px",
              fontSize: "14px",
            }}
            className="ml-2"
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchLibrary;

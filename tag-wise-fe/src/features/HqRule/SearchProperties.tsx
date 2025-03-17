import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

export type SearchPropertyParam = {
  propertyName?: string;
};

function SearchProperties({
  isSearching,
  onSearch,
}: {
  isSearching: boolean;
  onSearch: (searchData: SearchPropertyParam) => void;
}) {
  const onFinish: FormProps<SearchPropertyParam>["onFinish"] = async (
    values
  ) => {
    const { propertyName } = values;
    onSearch({
      propertyName: propertyName ? propertyName.trim() : "",
    });
  };

  const onFinishFailed: FormProps<SearchPropertyParam>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: "100%", padding: "20px", marginTop: "40px" }}>
      <Form
        name="SearchProperties"
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<SearchPropertyParam>
          name="propertyName"
          initialValue="Vietnam"
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

export default SearchProperties;

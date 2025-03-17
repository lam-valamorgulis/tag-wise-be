import { Spin } from "antd";

function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Spin size="large" tip="Loading..." />
    </div>
  );
}

export default Loading;

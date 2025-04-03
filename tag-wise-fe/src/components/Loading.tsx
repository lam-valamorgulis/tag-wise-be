import { Spin } from "antd";

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center backdrop-blur-sm">
      <Spin size="large" tip="Loading..." />
    </div>
  );
}

export default Loading;

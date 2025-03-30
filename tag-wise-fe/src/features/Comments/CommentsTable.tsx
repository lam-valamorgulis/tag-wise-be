/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import {
  apiCreateComment,
  apiDeleteComment,
  apiEditComment,
  apiGetListComment,
} from "../../utils/axios";
import {
  Category,
  Comment,
  CommentFormValues,
  CommentsResponse,
} from "./types";

const categoryOptions = Object.values(Category).map((value) => ({
  label: value,
  value: value,
}));

const CommentsTable: React.FC = () => {
  const { user } = useAuth0();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const searchTerm = searchParams.get("searchTerm") || undefined;
  const category = searchParams.get("category") || undefined;

  useEffect(() => {
    if (isModalOpen) {
      if (editingComment) {
        form.setFieldsValue(editingComment);
      } else {
        form.resetFields();
      }
    }
  }, [isModalOpen, editingComment, form]);

  const { data: commentsResponse, isLoading } = useQuery<CommentsResponse>({
    queryKey: ["comments", searchTerm, category, page, limit],
    queryFn: () => apiGetListComment({ searchTerm, category, page, limit }),
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newParams = new URLSearchParams(searchParams);
    if (pagination.current) {
      newParams.set("page", pagination.current.toString());
    }
    if (pagination.pageSize) {
      newParams.set("limit", pagination.pageSize.toString());
    }
    setSearchParams(newParams);
  };

  const { mutate: saveComment } = useMutation({
    mutationFn: async (comment: CommentFormValues & { _id?: string }) => {
      const method = comment._id ? "PUT" : "POST";
      let response;

      const commentWithUser = {
        ...comment,
        createdBy: user?.email || "anonymous",
      };

      if (method === "POST") {
        response = await apiCreateComment(commentWithUser);
      } else {
        response = await apiEditComment(comment._id ?? "", commentWithUser);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setIsModalOpen(false);
      setEditingComment(null);
      form.resetFields();
      message.success("Comment saved successfully");
    },
    onError: (error: Error) => {
      Modal.error({
        title: "Operation Failed",
        content: error.message,
      });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (id: string) => apiDeleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleCopyText = async (text: string) => {
    try {
      // Check if the text is empty or null
      if (!text?.trim()) {
        message.warning("No content to copy");
        return;
      }

      // Use try-catch with async/await for better error handling
      await navigator.clipboard.writeText(text);

      // Show success message with custom config
      message.success({
        content: "Text copied to clipboard",
        duration: 2,
        className: "copy-success-message",
        style: {
          marginTop: "6vh",
        },
      });
    } catch (error) {
      // Show detailed error message
      message.error({
        content: "Failed to copy text. Please try again.",
        duration: 3,
        className: "copy-error-message",
      });
      console.error("Copy failed:", error);
    }
  };

  // Add this helper function at the top of your file
  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "#ffd54f" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const columns: TableColumnsType<Comment> = [
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      width: "150px",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "150px",
      render: (category: string) => (
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("category", category);
            setSearchParams(newParams);
          }}
        >
          {category}
        </span>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: "400px",
      render: (text: string) => (
        <div className="relative group">
          <CopyOutlined
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-blue-500 transition-opacity"
            onClick={() => handleCopyText(text)}
          />
          <div
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              paddingRight: "24px",
            }}
          >
            {highlightText(text, searchTerm ?? "")}
          </div>
        </div>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "150px",
      align: "center",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {format(new Date(text), "yyyy-MM-dd")}
        </div>
      ),
    },
    {
      title: "Updated By",
      dataIndex: "createdBy",
      key: "createdBy",
      width: "150px",
      align: "center",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "150px",
      align: "center",
      render: (_: any, record: Comment) => (
        <div className="space-x-2 flex justify-center">
          <Button
            onClick={() => {
              setEditingComment(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger onClick={() => deleteComment(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleFormSubmit = (values: CommentFormValues) => {
    saveComment({ ...editingComment, ...values });
  };

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("searchTerm", value);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("category", value);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Input.Search
            placeholder="Search by purpose or comment"
            allowClear
            onSearch={handleSearch}
            defaultValue={searchTerm}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filter by category"
            allowClear
            options={[
              { label: "All Categories", value: "" },
              ...categoryOptions,
            ]}
            onChange={handleCategoryChange}
            defaultValue={category}
            style={{ width: 200 }}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            setEditingComment(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Add Comment
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={commentsResponse?.comments ?? []}
        rowKey="_id"
        loading={isLoading}
        className="shadow-md"
        pagination={{
          total: commentsResponse?.pagination.total,
          pageSize: limit,
          current: page,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingComment ? "Edit Comment" : "New Comment"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingComment(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form<CommentFormValues>
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select a category"
              options={categoryOptions}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[{ required: true, message: "Please input a purpose!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please input a comment!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CommentsTable;

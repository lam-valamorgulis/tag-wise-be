/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TableColumnsType } from "antd";
import { Button, Form, Input, Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  apiCreateComment,
  apiDeleteComment,
  apiEditComment,
  apiGetListComment,
} from "../../utils/axios";

interface Comment {
  _id: string;
  purpose: string;
  commentDetail: string;
  category: string;
  hashtag: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentFormValues {
  purpose: string;
  commentDetail: string;
  category: string;
  hashtag: string;
}

const CommentsTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const hashtag = searchParams.get("hashtag") || undefined;
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

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", hashtag, category],
    queryFn: () => apiGetListComment(hashtag ?? "", category ?? ""),
  });

  const { mutate: saveComment } = useMutation({
    mutationFn: async (comment: CommentFormValues & { _id?: string }) => {
      const method = comment._id ? "PUT" : "POST";
      let response;

      if (method === "POST") {
        response = await apiCreateComment(comment);
      } else {
        response = await apiEditComment(comment._id ?? "", comment);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setIsModalOpen(false);
      setEditingComment(null);
      form.resetFields();
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
      dataIndex: "commentDetail",
      key: "commentDetail",
      width: "400px",
      render: (text: string) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Hashtag",
      dataIndex: "hashtag",
      key: "hashtag",
      width: "150px",
      align: "center",
      render: (hashtag: string) =>
        hashtag ? (
          <Tag
            className="cursor-pointer hover:bg-blue-100"
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("hashtag", hashtag);
              setSearchParams(newParams);
            }}
          >
            #{hashtag}
          </Tag>
        ) : (
          "--"
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

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
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
        dataSource={comments}
        rowKey="_id"
        loading={isLoading}
        className="shadow-md"
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
            rules={[{ required: true, message: "Please input a category!" }]}
          >
            <Input />
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
            name="commentDetail"
            rules={[{ required: true, message: "Please input a comment!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Hashtag" name="hashtag">
            <Input />
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

export interface Comment {
  _id: string;
  category: string;
  purpose: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CommentsResponse {
  comments: Comment[];
  pagination: Pagination;
}

export interface CommentFormValues {
  category: string;
  purpose: string;
  comment: string;
  createdBy: string;
}

export enum Category {
  ThirdPartyTag = "3rd Party Tag",
  AccountCreation = "Account Creation",
  Maintenance = "Maintenance",
  Enhancement = "Enhancement",
  General = "General",
}

export interface QueryParams {
  searchTerm?: string;
  category?: string;
  page?: number;
  limit?: number;
}

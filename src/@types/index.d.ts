declare interface PrismaApiResponse<T> {
  data: T;
  total_pages: number;
  current_page: number;
}

declare interface ActionsResponse<T> {
  message: string;
  status: boolean;
  type: string;
  data: T;
  errors?: {
    [key: string]: string;
  };
}

declare interface PrismaActionResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

declare interface ApiResponse<T> {
  total: number;
  pages: number;
  current_page: number;
  per_page: number;
  total_page: number;
  data: T;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

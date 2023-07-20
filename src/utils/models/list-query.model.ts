import { HttpStatusCode } from "axios";
import { QueryParam } from "./query-param.model";

export interface ListQuery {
  pageSize?: number;
  pageIndex?: number;
  sort?: string;
  query?: QueryParam;
}

export interface ListResult<T> {
  success: boolean;
  code: HttpStatusCode;
  data: {
    record: number;
    data: Array<T>;
  };
  message: string;
}

export interface Result<T> {
  success: boolean;
  code: HttpStatusCode;
  data: T;
  message: string;
}

export interface GetResult<T> {
  success: boolean;
  code: HttpStatusCode;
  data: T;
  message: string;
}

export interface GetResultList<T> {
  success: boolean;
  code: HttpStatusCode;
  data: Array<T>;
  message: string;
}

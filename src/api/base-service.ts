import { http } from "@/utils/http";
import { ListResult, QueryParam, ResourceBase, Result } from "@/utils/models";

class Service {
  private baseRequestUrl = "";
  constructor(url: string) {
    this.baseRequestUrl = url;
  }

  getList<T extends ResourceBase>(query: QueryParam): Promise<ListResult<T>> {
    return http.get(`${this.baseRequestUrl}/getList`, { params: query });
  }

  get<T extends ResourceBase>(id: string): Promise<Result<T>> {
    return http.get(`${this.baseRequestUrl}/${id}`);
  }

  delete(id: string): Promise<Result<boolean>> {
    return http.delete(this.baseRequestUrl, id);
  }

  add<T>(data: T): Promise<Result<string>> {
    return http.post(this.baseRequestUrl, { data });
  }
}

export default Service;

import { Dept } from '@/modules';
import { http } from '@/utils/http';
import { GetResult, GetResultList, KvType, ListResult } from '@/utils/models';

function getDept(id: number): Promise<GetResult<Dept>> {
  return http.get(`/api/dept/get/${id}`);
}

function getDeptList(data): Promise<GetResultList<Dept>> {
  const params = JSON.parse(JSON.stringify(data));
  return http.get<KvType, GetResultList<Dept>>(
    '/api/dept/findListByNameAndStatus',
    {
      params
    }
  );
}

function addDept(data: Dept) {
  return http.post<KvType, ListResult<Dept>>('/api/dept/add', {
    data
  });
}

function updateDept(data: Dept) {
  return http.post<KvType, ListResult<Dept>>('/api/dept/update', {
    data
  });
}

function deleteDept(id: number): Promise<boolean> {
  return http.get(`/api/dept/delete/${id}`);
}

export { getDept, getDeptList, deleteDept, addDept, updateDept };

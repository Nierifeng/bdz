import { Menu, Role } from '@/modules';
import { http } from '@/utils/http';
import { GetResult, KvType, ListResult } from '@/utils/models';

function getRole(id: number): Promise<GetResult<Role>> {
  return http.get(`/api/role/get/${id}`);
}

function getRoleList(data): Promise<ListResult<Role>> {
  const queryData = JSON.parse(JSON.stringify(data));

  if (!queryData.key) {
    queryData.key = '';
  }
  return http.post<KvType, ListResult<Role>>('/api/role/getPagedList', {
    data: queryData
  });
}

function addRole(data: Role): Promise<ListResult<Role>> {
  return http.post<KvType, ListResult<Role>>('/api/role/add', {
    data
  });
}

function updateRole(data: Role): Promise<ListResult<Role>> {
  return http.post<KvType, ListResult<Role>>('/api/role/update', {
    data
  });
}

function deleteRole(id: number): Promise<boolean> {
  return http.get(`/api/role/delete/${id}`);
}

function getRoleMenus(ids: Array<string>) {
  return http.get<KvType, { success: boolean; data: Array<Menu> }>(
    `/api/role/getRoleMenus`,
    {
      params: { ids: JSON.stringify(ids) }
    }
  );
}

export { getRole, getRoleList, deleteRole, addRole, updateRole, getRoleMenus };

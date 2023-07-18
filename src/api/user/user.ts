import { User } from '@/modules';
import { http } from '@/utils/http';
import { GetResult, KvType, ListResult } from '@/utils/models';

export type UserResult = {
  success: boolean;
  data: string;
  // data: {
  //   /** 用户名 */
  //   username: string;
  //   /** 当前登陆用户的角色 */
  //   roles: Array<string>;
  //   /** `token` */
  //   accessToken: string;
  //   /** 用于调用刷新`accessToken`的接口时所需的`token` */
  //   refreshToken: string;
  //   /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  //   expires: Date;
  // };
};

export type RefreshTokenResult = {
  success: boolean;
  data: string;
};

function getUser(id: number): Promise<GetResult<User>> {
  return http.get(`/api/user/get/${id}`);
}

function getUserList(data): Promise<ListResult<User>> {
  const query = JSON.parse(JSON.stringify(data));
  if (query.deptId === '') {
    query.deptId = -1;
  }
  if (query.status === '') {
    query.status = -1;
  }
  if (!query.createdTime) {
    query.startDate = '';
    query.endDate = '';
  } else {
    query.startDate = query.createdTime[0];
    query.endDate = query.createdTime[1];
  }
  return http.post<KvType, ListResult<User>>('/api/user/getPagedList', {
    data: query
  });
}

function addUser(data: User) {
  return http.post<KvType, ListResult<User>>('/api/user/add', {
    data
  });
}

function updateUser(data: User) {
  return http.post<KvType, ListResult<User>>('/api/user/update', {
    data
  });
}

function deleteUser(id: number): Promise<boolean> {
  return http.get(`/api/user/delete/${id}`);
}

/** 登录 */
function getLogin(data?: object) {
  return http.request<UserResult>('post', 'api/auth/login', { data });
}

/** 刷新token */
function refreshTokenApi() {
  return http.request<RefreshTokenResult>('get', 'api/auth/refreshToken');
}

export {
  getUser,
  getUserList,
  deleteUser,
  addUser,
  updateUser,
  getLogin,
  refreshTokenApi
};

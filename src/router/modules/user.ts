const userRouter: RouteConfigsTable = {
  path: "/user",
  meta: {
    icon: "user",
    title: "用户管理",
    rank: 5
  },
  children: [
    {
      path: "/user/user/index",
      name: "user",
      component: () => import("@/views/user/user/list/index.vue"),
      meta: {
        title: "用户管理"
      }
    },
    {
      path: "/user/dept/index",
      name: "server",
      component: () => import("@/views/user/dept/list/index.vue"),
      meta: {
        title: "部门管理"
      }
    },
    {
      path: "/user/role/index",
      name: "role",
      component: () => import("@/views/user/role/list/index.vue"),
      meta: {
        title: "角色管理"
      }
    }
  ]
};
export default userRouter;

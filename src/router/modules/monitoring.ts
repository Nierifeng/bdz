const monitoringRouter: RouteConfigsTable = {
  path: "/monitoring",
  meta: {
    icon: "monitoring",
    title: "监控",
    rank: 5
  },
  children: [
    {
      path: "/monitoring/monitoring/index",
      name: "monitoring",
      component: () => import("@/views/monitoring/monitoring/list/index.vue"),
      meta: {
        title: "监控管理"
      }
    },
    {
      path: "/moitoring/configManager/index",
      name: "configManager",
      component: () =>
        import("@/views/monitoring/config-manager/list/index.vue"),
      meta: {
        title: "配置管理"
      }
    }
  ]
};
export default monitoringRouter;

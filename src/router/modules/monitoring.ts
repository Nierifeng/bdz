const monitoringRouter: RouteConfigsTable = {
  path: "/monitoring",
  meta: {
    icon: "monitoring",
    title: "监控",
    rank: 5
  },
  children: [
    {
      path: "/monitoring/monitoring/list",
      name: "monitoring",
      component: () => import("@/views/monitoring/monitoring/list/index.vue"),
      meta: {
        title: "监控管理"
      }
    },
    {
      path: "/moitoring/configManager/list",
      name: "configManager",
      component: () =>
        import("@/views/monitoring/config-manager/list/index.vue"),
      meta: {
        title: "配置管理"
      }
    },
    {
      path: "/monitoring/data-identification/list",
      name: "dataIdentification",
      component: () =>
        import("@/views/monitoring/data-identification/list/index.vue"),
      meta: {
        title: "数据识别"
      }
    },
    {
      path: "/monitoring/data-identification/screenshot/:id",
      name: "screenshot",
      component: () =>
        import("@/views/monitoring/data-identification/screenshot/index.vue"),
      meta: {
        title: "截图",
        showLink: false
      }
    },
    {
      path: "/monitoring/ai-training/list",
      name: "aiTraining",
      component: () => import("@/views/monitoring/ai-training/list/index.vue"),
      meta: {
        title: "AI训练"
      }
    }
  ]
};
export default monitoringRouter;

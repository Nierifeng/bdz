import { message } from "@/utils/message";
import { PaginationProps } from "@pureadmin/table";
import { onMounted, reactive, ref } from "vue";

export function useMonitoring() {
  const columns: TableColumnList = [
    {
      label: "监控网关",
      prop: "gateway",
      minWidth: 200
    },
    {
      label: "类别",
      prop: "type",
      minWidth: 200
    },
    {
      label: "区域",
      prop: "area",
      minWidth: 200
    },
    {
      label: "名称",
      prop: "name",
      minWidth: 200
    },
    {
      label: "同步时间",
      prop: "time",
      minWidth: 200
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 200
    },
    {
      label: "操作",
      slot: "operation",
      minWidth: 200
    }
  ];

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const loading = ref(true);

  function openDialog() {
    console.log("openDialog");
  }

  function onSearch() {
    console.log("onSearch");
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function previewMonitoring(id: string) {
    console.log(id, "previewMonitoring");
  }

  function updateMonitoring(id: string) {
    console.log(id, "updateMonitoring");
  }

  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });

  return {
    columns,
    pagination,
    loading,
    onSearch,
    openDialog,
    handleDelete,
    handleSizeChange,
    updateMonitoring,
    previewMonitoring,
    handleCurrentChange,
    handleSelectionChange
  };
}

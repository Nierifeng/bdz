import { message } from "@/utils/message";
import { PaginationProps } from "@pureadmin/table";
import { onMounted, reactive, ref } from "vue";

export function useConfigManager() {
  const columns: TableColumnList = [
    {
      label: "网关名称",
      prop: "name",
      minWidth: 200
    },
    {
      label: "网关IP",
      prop: "ip",
      minWidth: 200
    },
    {
      label: "appid",
      prop: "appId",
      minWidth: 200
    },
    {
      label: "appScrect",
      prop: "appScrect",
      minWidth: 200
    },
    {
      label: "数量",
      prop: "quantity",
      minWidth: 200
    },
    {
      label: "操作",
      prop: "action",
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

  const addDialogVisible = ref(false);

  function openDialog() {
    addDialogVisible.value = true;
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

  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });

  return {
    addDialogVisible,
    columns,
    pagination,
    loading,
    onSearch,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    openDialog
  };
}

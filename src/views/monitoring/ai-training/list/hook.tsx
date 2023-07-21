import AiTrainingService from "@/api/monitoring/ai-training";
import { DataIdentification } from "@/models";
import { message } from "@/utils/message";
import { PaginationProps } from "@pureadmin/table";
import { FormInstance } from "element-plus";
import { onMounted, reactive, ref } from "vue";

export function useConfigManager() {
  const columns: TableColumnList = [
    {
      label: "图片",
      slot: "image",
      width: 130
    },
    {
      label: "名称",
      prop: "name"
    },
    {
      label: "类别",
      prop: "type"
    },
    {
      label: "操作",
      slot: "operation"
    }
  ];

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const loading = ref(true);

  const formData = ref<DataIdentification>({});

  const addDialogVisible = ref(false);

  const tableData = ref<Array<DataIdentification>>([]);

  const aiTrainingService = new AiTrainingService();

  function openDialog() {
    addDialogVisible.value = true;
  }

  async function onSearch() {
    const { data } = await aiTrainingService.getList({
      page: pagination.currentPage,
      size: pagination.pageSize,
      ...formData.value
    });
    tableData.value = data.data;
    loading.value = false;
  }

  async function handleDelete(row: DataIdentification) {
    await aiTrainingService.delete(row.id);
    message(`删除成功`, { type: "success" });
    onSearch();
  }

  function resetForm(formEl: FormInstance | undefined) {
    console.log(formEl);

    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  onMounted(async () => {
    await onSearch();
  });

  return {
    addDialogVisible,
    columns,
    pagination,
    loading,
    formData,
    onSearch,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    openDialog,
    tableData
  };
}

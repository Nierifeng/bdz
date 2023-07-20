import DataIdentificationService from "@/api/monitoring/data-identification";
import MonitoringService from "@/api/monitoring/monitoring";
import { DataIdentification } from "@/models";
import { message } from "@/utils/message";
import { SelectType } from "@/utils/models";
import { mapDataToSelect } from "@/utils/selete";
import { PaginationProps } from "@pureadmin/table";
import { FormInstance } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export function useConfigManager() {
  const columns: TableColumnList = [
    {
      label: "名称",
      prop: "name"
    },
    {
      label: "监控",
      prop: "monitoringName"
    },
    {
      label: "角度",
      prop: "angle"
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

  const router = useRouter();

  const formData = ref<DataIdentification>({});

  const addDialogVisible = ref(false);

  const monitoringOptions = ref<Array<SelectType>>([]);

  const tableData = ref<Array<DataIdentification>>([]);

  const dataIdentificationService = new DataIdentificationService();
  const monitoringService = new MonitoringService();

  function openDialog() {
    addDialogVisible.value = true;
  }

  async function onSearch() {
    const { data } = await dataIdentificationService.getList({
      page: pagination.currentPage,
      size: pagination.pageSize,
      ...formData.value
    });
    console.log(data);
    tableData.value = data.data;
    loading.value = false;
  }

  async function handleDelete(row: DataIdentification) {
    await dataIdentificationService.delete(row.id);
    message(`删除成功`, { type: "success" });
    onSearch();
  }

  function resetForm(formEl: FormInstance | undefined) {
    console.log(formEl);

    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function getMonitoringOptions() {
    const { data } = await monitoringService.getList({ limit: 100, page: 1 });
    monitoringOptions.value = mapDataToSelect(data.data);
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function showRecord() {
    console.log("showRecord");
  }

  function screenshot(id: string) {
    router.push(`/monitoring/data-identification/screenshot/${id}`);
  }

  onMounted(async () => {
    await onSearch();
    await getMonitoringOptions();
  });

  return {
    addDialogVisible,
    columns,
    pagination,
    loading,
    formData,
    monitoringOptions,
    onSearch,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    openDialog,
    showRecord,
    screenshot,
    tableData
  };
}

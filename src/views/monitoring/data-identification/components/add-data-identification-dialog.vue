<template>
  <el-dialog :title="title" v-model="visible" width="20%">
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="监控" prop="monitoringId">
        <el-select
          v-model="formData.monitoringId"
          class="el-form-select"
          value-key="value"
          placeholder="请选择监控"
          clearable
          filterable
        >
          <el-option
            v-for="item in monitoringOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角度" prop="angle">
        <el-input v-model.number="formData.angle" placeholder="请输入角度" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { FormRules } from "element-plus";
import MonitoringService from "@/api/monitoring/monitoring";
import { SelectType } from "@/utils/models";
import { ref } from "vue";
import { mapDataToSelect } from "@/utils/selete";
import { DataIdentification } from "@/models";
import DataIdentificationService from "@/api/monitoring/data-identification";

defineOptions({
  name: "add-data-identification-dialog"
});

const title = "添加数据识别";

const visible = defineModel("visible", { default: false });

const emits = defineEmits(["refreshTable"]);

const formData = reactive<DataIdentification>({
  name: "",
  monitoringId: "",
  angle: null
});

const rules: FormRules = {
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  monitoringId: [{ required: true, message: "请选择摄像头", trigger: "blur" }],
  angle: [
    { required: true, message: "请输入角度", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur"
    }
  ]
};

const monitoringOptions = ref<Array<SelectType>>([]);

const monitoringService = new MonitoringService();
const dataIdentificationService = new DataIdentificationService();

async function getMonitoringOptions() {
  const { data } = await monitoringService.getList({ limit: 100, page: 1 });
  monitoringOptions.value = mapDataToSelect(data.data);
}

async function onConfirm() {
  const { data } = await dataIdentificationService.add(formData);
  console.log(data);
  emits("refreshTable");
  visible.value = false;
}

onMounted(async () => {
  await getMonitoringOptions();
});
</script>

<style lang="scss" scoped></style>

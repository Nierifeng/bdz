<template>
  <el-dialog
    :title="title"
    v-model="visible"
    width="30%"
    :before-close="onClose"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="form.type"
          value-key="value"
          placeholder="请选择类型"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="ip" prop="ip">
        <el-input v-model="form.ip" placeholder="请输入ip" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入描述"
        />
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
import { reactive } from "vue";
import { FormRules } from "element-plus";

interface Props {
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const visible = defineModel("visible", { default: false });

defineOptions({
  name: "addmonitoring"
});

const options = [
  {
    value: 1,
    label: "数据设备"
  },
  {
    value: 2,
    label: "监控设备"
  }
];

const form = reactive({
  name: "",
  ip: "",
  type: 1,
  description: ""
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入名称", trigger: "blur", type: "string" }
  ]
});

function onConfirm() {
  visible.value = false;
}

function onClose() {
  visible.value = false;
}
</script>
<style lang="scss" scoped></style>

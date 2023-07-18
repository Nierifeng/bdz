<template>
  <el-dialog :title="title" v-model="visible" width="20%">
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="网关名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入网关名称" />
      </el-form-item>
      <el-form-item label="ip" prop="ip">
        <el-input v-model="formData.ip" placeholder="请输入ip" />
      </el-form-item>
      <el-form-item label="appId" prop="appId">
        <el-input v-model="formData.appId" placeholder="请输入appId" />
      </el-form-item>
      <el-form-item label="appscrect" prop="appscrect">
        <el-input v-model="formData.appscrect" placeholder="请输入appscrect" />
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input v-model.number="formData.quantity" placeholder="请输入数量" />
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
import { FormRules } from "element-plus";
import { reactive } from "vue";

defineOptions({
  name: "addConfigManagerDialog"
});

const visible = defineModel("visible", { default: false });

const title = "添加配置";

const formData = reactive({
  name: "",
  ip: "",
  appId: "",
  appscrect: "",
  quantity: null
});

const rules: FormRules = {
  name: [{ required: true, message: "请输入网关名称", trigger: "blur" }],
  ip: [{ required: true, message: "请输入ip", trigger: "blur" }],
  quantity: [
    { required: true, message: "请输入数量", trigger: "blur" },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur"
    }
  ]
};

function onConfirm() {
  visible.value = false;
}
</script>

<style lang="scss" scoped></style>

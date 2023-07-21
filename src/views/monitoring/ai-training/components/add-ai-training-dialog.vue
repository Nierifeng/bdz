<template>
  <el-dialog :title="title" v-model="visible" width="30%">
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="描述" prop="describe">
        <el-input v-model="formData.describe" />
      </el-form-item>
      <el-form-item label="上传dll" prop="describe">
        <el-input v-model="formData.describe" />
      </el-form-item>
      <el-form-item label="图片" prop="describe">
        <el-input v-model="formData.describe" />
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
  name: "add-ai-training-dialog"
});

const title = "添加AI训练";

const visible = defineModel("visible", { default: false });

const formData = reactive({
  describe: ""
});

const rules: FormRules = {
  describe: [{ required: true, message: "请输入描述", trigger: "blur" }]
};

function onConfirm() {
  visible.value = false;
}
</script>

<style lang="scss" scoped></style>

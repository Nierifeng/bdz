<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="formData"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="监控:" prop="monitoringId">
        <el-select
          v-model="formData.monitoringId"
          clearable
          filterable
          placeholder="请选择监控"
        >
          <el-option
            v-for="item in monitoringOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">
          搜索
        </el-button>
        <el-button @click="resetForm(formRef)"> 重置</el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="配置列表" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增数据识别
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="tableData"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              type="primary"
              :size="size"
              link
              @click="screenshot(row.id)"
            >
              截图
            </el-button>
            <el-button type="primary" :size="size" link @click="showRecord()">
              识别记录
            </el-button>
            <el-popconfirm
              :title="`是否确认删除？`"
              @confirm="handleDelete(row)"
              >123
              <template #reference>
                <el-button link type="primary" :size="size"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
    <add-data-identification-dialog
      v-if="addDialogVisible"
      v-model:visible="addDialogVisible"
      @refresh-table="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useConfigManager } from "./hook";
import addDataIdentificationDialog from "../components/add-data-identification-dialog.vue";
import { ref } from "vue";

defineOptions({
  name: "data-identification-list"
});

const formRef = ref();

const {
  columns,
  formData,
  pagination,
  loading,
  tableData,
  addDialogVisible,
  monitoringOptions,
  onSearch,
  resetForm,
  openDialog,
  showRecord,
  screenshot,
  handleDelete,
  handleSizeChange,
  handleCurrentChange
} = useConfigManager();
</script>

<style lang="scss" scoped></style>

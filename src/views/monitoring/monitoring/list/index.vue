<template>
  <div>
    <PureTableBar title="监控列表" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增监控
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
          :data="[]"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              :size="size"
              class="reset-margin"
              link
              type="primary"
              v-auth="'task.project.addTemplate'"
              @click="previewMonitoring(row)"
            >
              预览
            </el-button>
            <el-button
              :size="size"
              class="reset-margin"
              link
              type="primary"
              v-auth="'task.project.addTemplate'"
              @click="updateMonitoring(row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除？`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useMonitoring } from "./hook";

defineOptions({
  name: "MonitoringList"
});

const {
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
} = useMonitoring();
</script>

<style scoped lang="scss"></style>

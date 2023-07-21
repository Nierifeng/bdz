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
      <el-form-item label="类别:" prop="type">
        <el-input v-model="formData.type" placeholder="请输入类别" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">
          搜索
        </el-button>
        <el-button @click="resetForm(formRef)"> 重置</el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="AI训练列表" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增AI训练
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
          <template #image="{ row, index }">
            <el-image
              preview-teleported
              loading="lazy"
              :src="row.image"
              :preview-src-list="tableData.map(v => v.image)"
              :initial-index="index"
              fit="cover"
              class="w-[100px] h-[100px]"
            />
          </template>
          <template #operation="{ row }">
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
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useConfigManager } from "./hook";
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
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange
} = useConfigManager();
</script>

<style lang="scss" scoped></style>

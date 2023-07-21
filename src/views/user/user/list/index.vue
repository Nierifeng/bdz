<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            prefix-icon="Search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="{ label: 'name', children: 'children' }"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="deptTreeRef"
            node-key="id"
            :setCheckedKeys="setCheckedKeys"
            highlight-current
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <el-form :model="form" ref="formRef" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="form.name"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter="onSearch"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="form.phonenumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter="onSearch"
            />
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select
              v-model="form.status"
              placeholder="用户状态"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in stateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 308px">
            <el-date-picker
              v-model="form.createdTime"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="resetForm(formRef)"> 重置</el-button>
          </el-form-item>
        </el-form>

        <TableProBar
          title="用户管理列表"
          :loading="loading"
          :dataList="dataList"
          @refresh="onSearch"
        >
          <template #buttons>
            <el-button
              v-auth="'user.user.add'"
              type="primary"
              @click="addUser()"
              >添加</el-button
            >
          </template>
          <template v-slot="{ size }">
            <PureTableBar
              align="center"
              showOverflowTooltip
              table-layout="auto"
              :size="size"
              :data="dataList"
              :columns="columns"
              row-key="id"
              :pagination="pagination"
              :paginationSmall="size === 'small'"
              :header-cell-style="{
                background: 'var(--el-table-row-hover-bg-color)',
                color: 'var(--el-text-color-primary)'
              }"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
              <template #status="{ row }">
                <el-switch
                  v-model="row.status"
                  :active-value="true"
                  :inactive-value="false"
                  @click="handleStatusChange(row)"
                />
              </template>
              <template #operation="{ row }">
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  v-auth="'user.user.edit'"
                  :size="size"
                  @click="handleEdit(row)"
                >
                  编辑
                </el-button>
                <el-popconfirm
                  title="是否确认删除?"
                  @confirm="handleDelete(row.id)"
                >
                  <template #reference>
                    <el-button
                      v-auth="'user.user.delete'"
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
            </PureTableBar>
          </template>
        </TableProBar>
      </el-col>
    </el-row>
    <addUserDialog
      v-if="userDialog"
      v-model:visible="userDialog"
      :user-id="selectUser?.id"
      @update-list="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { getDeptList } from "@/api/user/dept";
import { deleteUser, getUser, getUserList, updateUser } from "@/api/user/user";
import { PureTableBar } from "@/components/RePureTableBar";
import { User } from "@/modules";
import { handleTree } from "@/utils/tree";
import { PaginationProps } from "@pureadmin/table";
import { ElMessage, ElMessageBox, ElTree, FormInstance } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import addUserDialog from "../components/add-user-dialog.vue";
import { useColumns } from "./columns";

const { columns } = useColumns();

const formRef = ref<FormInstance>();

const deptTreeRef = ref<InstanceType<typeof ElTree>>();
const deptName = ref("");
const deptOptions = ref([]);
const loading = ref(false);
const userDialog = ref(false);
const form = reactive({
  name: "",
  status: "",
  phonenumber: "",
  pageIndex: 1,
  pageSize: 10,
  createdTime: "",
  deptId: -1
});

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});

const stateOptions = ref([
  { label: "启用", value: 1 },
  { label: "禁用", value: 2 }
]);

const dataList = ref([]);

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

let selectUser = null;

async function getDeptOptions() {
  const { data } = await getDeptList({ name: "" });
  deptOptions.value = handleTree(data);
}

function handleCurrentChange(val: number) {
  form.pageIndex = val;
  onSearch();
}

function handleSizeChange(val: number) {
  form.pageSize = val;
  onSearch();
}

function handleStatusChange(row: User) {
  const text = row.status ? "启用" : "停用";
  ElMessageBox.confirm(`确定要${text} ${row.userName}用户吗？`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(function () {
      return getUser(row.id).then(data => {
        return updateUser({
          description: "",
          ...data.data,
          status: !data.data.status
        });
      });
    })
    .then(() => {
      ElMessage.success(`${text}成功`);
    })
    .catch(function () {
      row.status = !row.status;
    });
}

function setCheckedKeys(keys, leafOnly) {
  console.log(keys, leafOnly);
}

function addUser() {
  selectUser = null;
  userDialog.value = true;
}

function handleEdit(row) {
  selectUser = row;
  userDialog.value = true;
}

async function handleDelete(userId: number) {
  await deleteUser(userId);
  ElMessage.success("删除成功");
  onSearch();
}

const filterNode = (value, data) => {
  console.log(value, data);

  if (!value) return true;
  return data.name.indexOf(value) !== -1;
};

async function onSearch() {
  loading.value = true;
  const { data } = await getUserList(form);
  dataList.value = data.data;
  pagination.total = data.record;
  loading.value = false;
}

function handleNodeClick(data) {
  if (data.id === form?.deptId) {
    deptTreeRef.value!.setCurrentKey(null);
    form.deptId = -1;
  } else {
    form.deptId = data.id;
  }

  onSearch();
}

watch(deptName, val => {
  deptTreeRef.value!.filter(val);
});

onMounted(async () => {
  await getDeptOptions();
  await onSearch();
});
</script>

<style scoped></style>

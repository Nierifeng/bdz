import { ref } from 'vue';

export function useColumns() {
  const columns = ref([
    { label: '名称', prop: 'name' },
    { label: '状态', slot: 'status' },
    { label: '创建时间', prop: 'createdTime' },
    { label: '操作', fixed: 'right', width: 200, slot: 'operation' }
  ]);

  return {
    columns
  };
}

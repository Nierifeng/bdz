export function useColumns() {
  const columns: TableColumnList = [
    { label: "角色名称", prop: "name" },
    { label: "权限字符", prop: "key" },
    { label: "状态", slot: "status" },
    { label: "创建时间", prop: "createdTime" },
    { label: "操作", fixed: "right", width: 120, slot: "operation" }
  ];

  return {
    columns
  };
}

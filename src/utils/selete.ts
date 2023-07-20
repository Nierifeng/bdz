import { SelectType } from "./models";

function mapDataToSelect(
  data: Array<any>,
  lableAttribute = "name"
): Array<SelectType> {
  return data.map(item => {
    return {
      value: item.id,
      label: item[lableAttribute]
    };
  });
}
export { mapDataToSelect };

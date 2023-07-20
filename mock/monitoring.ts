import { MockMethod } from "vite-plugin-mock";
import { dataIdentificationDatas, monitoringDatas } from "./datas";

// 模拟刷新token接口
export default [
  {
    url: "/api/monitoring/getList",
    method: "get",
    response: ({ query }) => {
      console.log(query);

      return {
        success: true,
        data: {
          data: monitoringDatas ?? [],
          record: monitoringDatas.length
        }
      };
    }
  },
  {
    url: "/api/dataIdentification/:id",
    method: "get",
    response: ({ query }) => {
      const id = query.id;
      const data = dataIdentificationDatas.find(item => item.id === id);
      return {
        success: true,
        data: data
      };
    }
  },
  {
    url: "/api/dataIdentification/:id",
    method: "delete",
    response: ({ query }) => {
      const id = query.id;
      dataIdentificationDatas.splice(
        dataIdentificationDatas.findIndex(item => item.id === id),
        1
      );
      return {
        success: true,
        data: true
      };
    }
  }
] as MockMethod[];

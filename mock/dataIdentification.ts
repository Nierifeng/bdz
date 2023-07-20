import { MockMethod } from "vite-plugin-mock";
import { dataIdentificationDatas, monitoringDatas } from "./datas";

// 模拟刷新token接口
export default [
  {
    url: "/api/dataIdentification/getList",
    method: "get",
    response: ({ query }) => {
      console.log(query);

      let datas = dataIdentificationDatas;
      if (query.monitoringId) {
        datas = datas.filter(item => item.monitoringId === query.monitoringId);
      }

      if (query.name) {
        datas = datas.filter(item => item.name.includes(query.name));
      }

      const monitorings = monitoringDatas.filter(item =>
        datas.map(item => item.monitoringId).includes(item.id)
      );

      datas = datas.map(item => ({
        ...item,
        monitoringName: monitorings.find(i => i.id === item.monitoringId)?.name
      }));

      return {
        success: true,
        data: {
          data: datas ?? [],
          record: datas.length
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
  },
  {
    url: "/api/dataIdentification",
    method: "post",
    response: ({ body }) => {
      const id = new Date().getTime().toString();
      console.log(body);
      dataIdentificationDatas.push({ ...body, id });
      return {
        success: true,
        data: id
      };
    }
  }
] as MockMethod[];

import { MockMethod } from "vite-plugin-mock";
import { aiTrainingDatas } from "./datas";

// 模拟刷新token接口
export default [
  {
    url: "/api/aiTraining/getList",
    method: "get",
    response: ({ query }) => {
      console.log(query);

      let datas = aiTrainingDatas;
      if (query.name) {
        datas = datas.filter(item => item.name.includes(query.name));
      }

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
    url: "/api/aiTraining/:id",
    method: "get",
    response: ({ query }) => {
      const id = query.id;
      const data = aiTrainingDatas.find(item => item.id === id);
      return {
        success: true,
        data: data
      };
    }
  },
  {
    url: "/api/aiTraining/:id",
    method: "delete",
    response: ({ query }) => {
      const id = query.id;
      aiTrainingDatas.splice(
        aiTrainingDatas.findIndex(item => item.id === id),
        1
      );
      return {
        success: true,
        data: true
      };
    }
  },
  {
    url: "/api/aiTraining",
    method: "post",
    response: ({ body }) => {
      const id = new Date().getTime().toString();
      aiTrainingDatas.push({ ...body, id });
      return {
        success: true,
        data: id
      };
    }
  }
] as MockMethod[];

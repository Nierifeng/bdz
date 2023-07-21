import { AITraining, DataIdentification, Monitoring } from "@/models";

const dataIdentificationDatas: Array<DataIdentification> = [
  {
    name: "识别1",
    monitoringId: "1",
    id: "1",
    angle: 0
  },
  {
    name: "识别2",
    monitoringId: "2",
    id: "2",
    angle: 10
  },
  {
    name: "识别3",
    monitoringId: "3",
    id: "3",
    angle: 20
  }
];

const monitoringDatas: Array<Monitoring> = [
  {
    name: "监控1",
    id: "1",
    type: "1",
    regionId: "1",
    regionName: "区域1",
    synchronisedTime: "2022-10-10 10:10:10",
    status: "1"
  },
  {
    name: "监控2",
    id: "2",
    type: "2",
    regionId: "2",
    regionName: "区域2",
    synchronisedTime: "2022-10-10 10:10:10",
    status: "2"
  },
  {
    name: "监控3",
    id: "3",
    type: "3",
    regionId: "3",
    regionName: "区域3",
    synchronisedTime: "2022-10-10 10:10:10",
    status: "3"
  }
];

const aiTrainingDatas: Array<AITraining> = [
  {
    name: "AI1",
    image: "https://pure-admin.github.io/pure-admin-table/imgs/1.jpg",
    type: "1",
    id: "1"
  },
  {
    name: "AI2",
    image: "https://pure-admin.github.io/pure-admin-table/imgs/2.jpg",
    type: "2",
    id: "2"
  },
  {
    name: "AI3",
    image: "https://pure-admin.github.io/pure-admin-table/imgs/3.jpg",
    type: "3",
    id: "3"
  },
  {
    name: "AI4",
    image: "https://pure-admin.github.io/pure-admin-table/imgs/4.jpg",
    type: "4",
    id: "4"
  },
  {
    name: "AI5",
    image: "https://pure-admin.github.io/pure-admin-table/imgs/5.jpg",
    type: "5",
    id: "5"
  }
];

export { dataIdentificationDatas, monitoringDatas, aiTrainingDatas };

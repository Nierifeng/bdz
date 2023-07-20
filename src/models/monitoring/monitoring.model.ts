import { ResourceBase } from "@/utils/models";

export interface Monitoring extends ResourceBase {
  /**
   * 网关
   */
  gateway?: string;

  name?: string;

  type?: string;

  regionId?: string;

  regionName?: string;

  ip?: string;

  key?: string;

  account?: string;

  passWord?: string;

  /**  同步时间 */
  synchronisedTime?: string;

  status?: string;
}

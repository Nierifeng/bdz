import { ResourceBase } from "@/utils/models";

export interface DataIdentification extends ResourceBase {
  name?: string;
  monitoringId?: string;
  monitoringName?: string;
  angle?: number;
}

import { ResourceBase } from "@/utils/models";

export interface AITraining extends ResourceBase {
  name?: string;
  image?: string;
  type?: string;
}

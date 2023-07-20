export interface QueryParam {
  [key: string]: string | number | Array<string>;
}

export interface KeyValue {
  [key: string]: string | Array<string>;
}

export interface KvType {
  [key: string]: any;
}

export interface EnumType {
  key: string;
  value: number;
}

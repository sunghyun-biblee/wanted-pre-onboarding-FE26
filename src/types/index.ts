export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface MockDataRes {
  datas: MockData[];
  isEnd: boolean;
}

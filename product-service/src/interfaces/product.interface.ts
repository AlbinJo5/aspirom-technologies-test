export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  userId: string;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  userId: string;
}

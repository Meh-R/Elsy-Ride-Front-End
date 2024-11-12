export type AuthProps = {
  firstName: string;
  lastName: string;
  adresse: string;
  postaleCode: number;
  city: string;
  email: string;
  password: string;
  cart: Cart;
};

export interface CartHasProduct {
  // cart: Cart[];
  id: string;
  productId: string;
  product: Product;
  quantity?: number;
  isActive?: boolean;
}

export interface UpdateCartHasProductDto {
  quantity?: number;
  isActive?: boolean;
}
// interface Cart {}

export type LogProps = {
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  picsProduct: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  created_at: string;
  updated_at: string;
  category: { type: string };
};

export type Category = {
  id: string;
  type: string;
  picsCategory?: string;
  created_at: string;
  updated_at: string;
};

export interface Cart {
  id: string;
  userId: string;
  user: AuthProps;
  cart_Has_Product: CartHasProduct[];
  order: Order[];
}

export interface Order {
  id?: string;
  cartId: string;
  cartHasProductId: string;
  total: number;
  status: string;
  cart?: Cart;
  purchaseDate?: Date;
  cartHasProduct?: CartHasProduct;
}
export type UserUpdateDto = {
  email?: string;
  firstName?: string;
  lastName?: string;
  adresse?: string;
  city?: string;
  postaleCode?: number;
  isActive?: number;
};

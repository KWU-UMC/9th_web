export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

export interface CartState {
  items: CartItem[];
  countSum: number;
  priceSum: number;
  loading: "idle" | "loading" | "succeeded" | "failed";
}

export interface ModalState {
  isOpen: boolean;
}

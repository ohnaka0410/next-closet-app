export type Item = {
  key: string;
  genreKey: string;
  categoryKey: string;
  brand: string;
  size?: string;
  price: number;
  purchaseDate?: string;
  initialUseCount: number;
  useCount: Readonly<number>;
  totalUseCount: Readonly<number>;
  imageKey: string;
  createdAt: Readonly<string>;
};

export type ItemSummary = {
  price: Readonly<number>;
  totalUseCount: Readonly<number>;
};

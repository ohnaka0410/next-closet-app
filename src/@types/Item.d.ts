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
  userId: string;
};

export type ItemSummary = {
  count: Readonly<number>;
  price: Readonly<number>;
  totalUseCount: Readonly<number>;
  userId: string;
};

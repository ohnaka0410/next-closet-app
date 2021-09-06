export type Category = {
  key: string;
  name: string;
  genreKey: string;
  itemCount: Readonly<number>;
  itemTotalUsedCount: Readonly<number>;
  createdAt: Readonly<string>;
};

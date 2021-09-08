export type Genre = {
  key: string;
  name: string;
  itemCount: Readonly<number>;
  itemTotalUsedCount: Readonly<number>;
  createdAt: Readonly<string>;
  userId: string;
};

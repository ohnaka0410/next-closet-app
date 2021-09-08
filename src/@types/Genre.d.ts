export type Genre = {
  key: string;
  name: string;
  createdAt: Readonly<string>;
};

export type GenreSummary = Genre & {
  itemTotalUseCount: Readonly<number>;
  itemCount: Readonly<number>;
  userId: Readonly<string>;
};

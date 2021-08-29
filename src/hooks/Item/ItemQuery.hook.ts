import type { QueryOptions, MutateOptions } from "react-query";
import { useQuery, useMutation } from "react-query";
import type { Item, ItemSummary } from "~/@types";

const key = "item";

type ItemListByGenreKeyQueryParams = {
  genreKey: string;
};

type ItemListByGenreKeyQueryResult = Item[] | undefined;

export const useItemListByGenreKeyQuery = (
  { genreKey }: ItemListByGenreKeyQueryParams,
  options: QueryOptions<ItemListByGenreKeyQueryResult, Error>
) => {
  return useQuery<ItemListByGenreKeyQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<ItemListByGenreKeyQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type ItemListByCategoryKeyQueryParams = {
  categoryKey: string;
};

type ItemListByCategoryKeyQueryResult = Item[] | undefined;

export const useItemListByCategoryKeyQuery = (
  { categoryKey }: ItemListByCategoryKeyQueryParams,
  options: QueryOptions<ItemListByCategoryKeyQueryResult, Error>
) => {
  return useQuery<ItemListByCategoryKeyQueryResult, Error>(
    [key, { categoryKey }],
    async (): Promise<ItemListByCategoryKeyQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type BestUseTotalCountItemListQueryResult = Item[];

export const useBestUseTotalCountItemListQuery = (
  options: QueryOptions<BestUseTotalCountItemListQueryResult, Error>
) => {
  return useQuery<BestUseTotalCountItemListQueryResult, Error>(
    [key, "bestUseTotalCount"],
    async (): Promise<BestUseTotalCountItemListQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type WorstUseTotalCountItemListQueryResult = Item[];

export const useWorstUseTotalCountItemListQuery = (
  options: QueryOptions<WorstUseTotalCountItemListQueryResult, Error>
) => {
  return useQuery<WorstUseTotalCountItemListQueryResult, Error>(
    [key, "bestUseTotalCount"],
    async (): Promise<WorstUseTotalCountItemListQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type ItemQueryParams = {
  itemKey: string;
};

type ItemQueryResult = Item | undefined;

export const useItemQuery = ({ itemKey }: ItemQueryParams, options: QueryOptions<ItemQueryResult, Error>) => {
  return useQuery<ItemQueryResult, Error>(
    [key, { itemKey }],
    async (): Promise<ItemQueryResult> => {
      // TODO
      return undefined;
    },
    options
  );
};

type CreateItemMutationParams = Pick<
  Item,
  "genreKey" | "categoryKey" | "brand" | "size" | "price" | "purchaseDate" | "initialUseCount"
> & {
  imageFile?: File;
};

type CreateItemMutationResult = void;

export const useCreateItemMutation = (
  options: MutateOptions<CreateItemMutationResult, Error, CreateItemMutationParams>
) => {
  return useMutation<CreateItemMutationResult, Error, CreateItemMutationParams>(
    async ({ imageFile, ...item }: CreateItemMutationParams): Promise<CreateItemMutationResult> => {
      // TODO
      console.log(imageFile);
      console.log(item);
    },
    options
  );
};

type UpdateItemMutationParams = Pick<
  Item,
  "key" | "genreKey" | "categoryKey" | "brand" | "size" | "price" | "purchaseDate" | "initialUseCount"
> & {
  imageFile?: File;
};

type UpdateItemMutationResult = void;

export const useUpdateItemMutation = (
  options: MutateOptions<UpdateItemMutationResult, Error, UpdateItemMutationParams>
) => {
  return useMutation<UpdateItemMutationResult, Error, UpdateItemMutationParams>(
    async ({ imageFile, ...item }: UpdateItemMutationParams): Promise<UpdateItemMutationResult> => {
      // TODO
      console.log(imageFile);
      console.log(item);
    },
    options
  );
};

type DeleteItemMutationParams = {
  itemKey: string;
};

type DeleteItemMutationResult = void;

export const useDeleteItemMutation = (
  options: MutateOptions<DeleteItemMutationResult, Error, DeleteItemMutationParams>
) => {
  return useMutation<DeleteItemMutationResult, Error, DeleteItemMutationParams>(
    async ({ itemKey }: DeleteItemMutationParams): Promise<DeleteItemMutationResult> => {
      // TODO
      console.log(itemKey);
    },
    options
  );
};

type ItemSummaryQueryResult = ItemSummary[] | undefined;

export const useItemSummaryQuery = (options: QueryOptions<ItemSummaryQueryResult, Error>) => {
  return useQuery<ItemSummaryQueryResult, Error>(
    [key, "summary"],
    async (): Promise<ItemSummaryQueryResult> => {
      // TODO
      return undefined;
    },
    options
  );
};

import type { QueryOptions, MutateOptions } from "react-query";
import { useQuery, useMutation } from "react-query";
import type { Item, ItemSummary, Calendar } from "~/@types";
import { supabase } from "~/libraries";

const key = "item";

type ItemListByGenreKeyQueryParams = {
  genreKey: string | undefined;
  limit?: number;
};

type ItemListByGenreKeyQueryResult = Item[] | undefined;

export const useItemListByGenreKeyQuery = (
  { genreKey }: ItemListByGenreKeyQueryParams,
  options?: QueryOptions<ItemListByGenreKeyQueryResult, Error>
) => {
  return useQuery<ItemListByGenreKeyQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<ItemListByGenreKeyQueryResult> => {
      const { data, error } = await supabase
        .from<Item>("itemView")
        .select("*")
        .eq("genreKey", genreKey)
        .eq("userId", supabase.auth.user()?.id);
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type ItemListByCategoryKeyQueryParams = {
  categoryKey: string | undefined;
};

type ItemListByCategoryKeyQueryResult = Item[] | undefined;

export const useItemListByCategoryKeyQuery = (
  { categoryKey }: ItemListByCategoryKeyQueryParams,
  options?: QueryOptions<ItemListByCategoryKeyQueryResult, Error>
) => {
  return useQuery<ItemListByCategoryKeyQueryResult, Error>(
    [key, { categoryKey }],
    async (): Promise<ItemListByCategoryKeyQueryResult> => {
      const { data, error } = await supabase
        .from<Item>("itemView")
        .select("*")
        .eq("categoryKey", categoryKey)
        .eq("userId", supabase.auth.user()?.id);
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type BestUseTotalCountItemListQueryResult = Item[] | undefined;

export const useBestUseTotalCountItemListQuery = (
  options?: QueryOptions<BestUseTotalCountItemListQueryResult, Error>
) => {
  return useQuery<BestUseTotalCountItemListQueryResult, Error>(
    [key, "bestUseTotalCount"],
    async (): Promise<BestUseTotalCountItemListQueryResult> => {
      const { data, error } = await supabase
        .from<Item>("itemView")
        .select("*")
        .eq("userId", supabase.auth.user()?.id)
        .order("totalUseCount", { ascending: false })
        .limit(6);
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type WorstUseTotalCountItemListQueryResult = Item[] | undefined;

export const useWorstUseTotalCountItemListQuery = (
  options?: QueryOptions<WorstUseTotalCountItemListQueryResult, Error>
) => {
  return useQuery<WorstUseTotalCountItemListQueryResult, Error>(
    [key, "bestUseTotalCount"],
    async (): Promise<WorstUseTotalCountItemListQueryResult> => {
      const { data, error } = await supabase
        .from<Item>("itemView")
        .select("*")
        .eq("userId", supabase.auth.user()?.id)
        .order("totalUseCount", { ascending: true })
        .limit(6);
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type ItemListByDateQueryParams = {
  date: string | undefined;
};

type ItemListByDateQueryResult = Item[] | undefined;

type Test = Calendar & {
  itemView: Item[];
};

export const useItemListByDateQuery = (
  { date }: ItemListByDateQueryParams,
  options?: QueryOptions<ItemListByDateQueryResult, Error>
) => {
  return useQuery<ItemListByDateQueryResult, Error>(
    [key, { date }],
    async (): Promise<ItemListByDateQueryResult> => {
      if (date == null) {
        return undefined;
      }
      const { data, error } = await supabase
        .from<Test>("calendar")
        .select("*,itemView(*)")
        .eq("date", date)
        .eq("userId", supabase.auth.user()?.id ?? "");
      if (error != null) {
        throw error;
      }
      return (data ?? undefined)?.[0]?.itemView;
    },
    options
  );
};

type ItemQueryParams = {
  itemKey: string | undefined;
};

type ItemQueryResult = Item | undefined;

export const useItemQuery = ({ itemKey }: ItemQueryParams, options?: QueryOptions<ItemQueryResult, Error>) => {
  return useQuery<ItemQueryResult, Error>(
    [key, { itemKey }],
    async (): Promise<ItemQueryResult> => {
      if (itemKey == null) {
        return undefined;
      }
      const { data, error } = await supabase
        .from<Item>("itemView")
        .select("*")
        .eq("key", itemKey)
        .eq("userId", supabase.auth.user()?.id);
      if (error != null) {
        throw error;
      }
      return (data ?? undefined)?.[0];
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

type CreateItemMutationResult = Item;

export const useCreateItemMutation = (
  options?: MutateOptions<CreateItemMutationResult, Error, CreateItemMutationParams>
) => {
  return useMutation<CreateItemMutationResult, Error, CreateItemMutationParams>(
    async ({ imageFile, ...item }: CreateItemMutationParams): Promise<CreateItemMutationResult> => {
      const { data, error } = await supabase.from<Item>("item").insert({
        ...item,
        userId: supabase.auth.user()?.id,
      });
      if (error != null) {
        throw error;
      }
      const result = (data ?? undefined)?.[0];
      if (result == null) {
        throw new Error("insert failed");
      }
      return result;
    },
    options
  );
};

type UpdateItemMutationParams = Pick<
  Item,
  "key" | "genreKey" | "categoryKey" | "brand" | "size" | "price" | "purchaseDate" | "initialUseCount"
>;

type UpdateItemMutationResult = Item;

export const useUpdateItemMutation = (
  options?: MutateOptions<UpdateItemMutationResult, Error, UpdateItemMutationParams>
) => {
  return useMutation<UpdateItemMutationResult, Error, UpdateItemMutationParams>(
    async ({ key, ...item }: UpdateItemMutationParams): Promise<UpdateItemMutationResult> => {
      const { data, error } = await supabase
        .from<Item>("item")
        .update({
          ...item,
        })
        .eq("key", key)
        .eq("userId", supabase.auth.user()?.id);
      if (error != null) {
        throw error;
      }
      const result = (data ?? undefined)?.[0];
      if (result == null) {
        throw new Error("update failed");
      }
      return result;
    },
    options
  );
};

type DeleteItemMutationParams = {
  itemKey: string;
};

type DeleteItemMutationResult = void;

export const useDeleteItemMutation = (
  options?: MutateOptions<DeleteItemMutationResult, Error, DeleteItemMutationParams>
) => {
  return useMutation<DeleteItemMutationResult, Error, DeleteItemMutationParams>(
    async ({ itemKey }: DeleteItemMutationParams): Promise<DeleteItemMutationResult> => {
      const { error } = await supabase
        .from<Item>("item")
        .delete()
        .eq("key", itemKey)
        .eq("userId", supabase.auth.user()?.id);
      if (error != null) {
        throw error;
      }
    },
    options
  );
};

type ItemSummaryQueryResult = ItemSummary;

export const useItemSummaryQuery = (options?: QueryOptions<ItemSummaryQueryResult, Error>) => {
  return useQuery<ItemSummaryQueryResult, Error>(
    [key, "summary"],
    async (): Promise<ItemSummaryQueryResult> => {
      // TODO
      return {
        price: 0,
        totalUseCount: 1,
        userId: "111",
      };
    },
    options
  );
};

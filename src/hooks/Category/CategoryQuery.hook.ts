import type { QueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Category } from "~/@types";
import { supabase } from "~/libraries";

const key = "category";

type CategoryListByGenreKeyQueryParams = {
  genreKey: string | undefined;
};

type CategoryListByGenreKeyQueryResult = Category[] | undefined;

export const useCategoryListByGenreQuery = (
  { genreKey }: CategoryListByGenreKeyQueryParams,
  options?: QueryOptions<CategoryListByGenreKeyQueryResult, Error>
) => {
  return useQuery<CategoryListByGenreKeyQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<CategoryListByGenreKeyQueryResult> => {
      if (genreKey == null) {
        return [];
      }
      const { data, error } = await supabase.from<Category>("category").select("*").eq("genreKey", genreKey);
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type CategoryQueryParams = {
  categoryKey: string | undefined;
};

type CategoryQueryResult = Category | undefined;

export const useCategoryQuery = (
  { categoryKey }: CategoryQueryParams,
  options?: QueryOptions<CategoryQueryResult, Error>
) => {
  return useQuery<CategoryQueryResult, Error>(
    [key, { categoryKey }],
    async (): Promise<CategoryQueryResult> => {
      if (categoryKey == null) {
        return undefined;
      }
      const { data, error } = await supabase.from<Category>("category").select("*").eq("key", categoryKey);
      if (error != null) {
        throw error;
      }
      return (data ?? undefined)?.[0];
    },
    options
  );
};

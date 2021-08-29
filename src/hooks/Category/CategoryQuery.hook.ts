import type { QueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Category } from "~/@types";

const key = "category";

type CategoryListByGenreKeyQueryParams = {
  genreKey: string;
};

type CategoryListByGenreKeyQueryResult = Category[] | undefined;

export const useCategoryListByGenreQuery = (
  { genreKey }: CategoryListByGenreKeyQueryParams,
  options: QueryOptions<CategoryListByGenreKeyQueryResult, Error>
) => {
  return useQuery<CategoryListByGenreKeyQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<CategoryListByGenreKeyQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type CategoryQueryParams = {
  categoryKey: string;
};

type CategoryQueryResult = Category | undefined;

export const useCategoryQuery = (
  { categoryKey }: CategoryQueryParams,
  options: QueryOptions<CategoryQueryResult, Error>
) => {
  return useQuery<CategoryQueryResult, Error>(
    [key, { categoryKey }],
    async (): Promise<CategoryQueryResult> => {
      // TODO
      return undefined;
    },
    options
  );
};

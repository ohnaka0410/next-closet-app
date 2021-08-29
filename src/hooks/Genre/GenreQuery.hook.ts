import type { QueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Genre } from "~/@types";

const key = "genre";

type GenreListQueryResult = Genre[] | undefined;

export const useGenreListQuery = (options: QueryOptions<GenreListQueryResult, Error>) => {
  return useQuery<GenreListQueryResult, Error>(
    [key],
    async (): Promise<GenreListQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type GenreQueryParams = {
  genreKey: string;
};

type GenreQueryResult = Genre | undefined;

export const useGenreQuery = ({ genreKey }: GenreQueryParams, options: QueryOptions<GenreQueryResult, Error>) => {
  return useQuery<GenreQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<GenreQueryResult> => {
      // TODO
      return undefined;
    },
    options
  );
};

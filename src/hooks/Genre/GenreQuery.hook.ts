import type { QueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Genre } from "~/@types";
import { supabase } from "~/libraries";

const key = "genre";

type GenreListQueryResult = Genre[] | undefined;

export const useGenreListQuery = (options?: QueryOptions<GenreListQueryResult, Error>) => {
  return useQuery<GenreListQueryResult, Error>(
    [key],
    async (): Promise<GenreListQueryResult> => {
      const { data, error } = await supabase.from<Genre>("genreView").select("*");
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

type GenreQueryParams = {
  genreKey: string | undefined;
};

type GenreQueryResult = Genre | undefined;

export const useGenreQuery = ({ genreKey }: GenreQueryParams, options?: QueryOptions<GenreQueryResult, Error>) => {
  return useQuery<GenreQueryResult, Error>(
    [key, { genreKey }],
    async (): Promise<GenreQueryResult> => {
      if (genreKey == null) {
        return undefined;
      }
      const { data, error } = await supabase.from<Genre>("genreView").select("*").eq("key", genreKey);
      if (error != null) {
        throw error;
      }
      return (data ?? undefined)?.[0];
    },
    options
  );
};

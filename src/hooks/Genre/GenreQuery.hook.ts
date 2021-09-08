import type { QueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Genre, GenreSummary } from "~/@types";
import { supabase } from "~/libraries";

const key = "genre";

type GenreListQueryResult = Genre[] | undefined;

export const useGenreListQuery = (options?: QueryOptions<GenreListQueryResult, Error>) => {
  return useQuery<GenreListQueryResult, Error>(
    [key],
    async (): Promise<GenreListQueryResult> => {
      const { data, error } = await supabase.from<Genre>("genre").select("*");
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
      const { data, error } = await supabase.from<Genre>("genre").select("*").eq("key", genreKey);
      if (error != null) {
        throw error;
      }
      return (data ?? undefined)?.[0];
    },
    options
  );
};

type GenreSummaryListQueryResult = GenreSummary[] | undefined;

export const useGenreSummaryListQuery = (options?: QueryOptions<GenreSummaryListQueryResult, Error>) => {
  return useQuery<GenreSummaryListQueryResult, Error>(
    [key, "summary"],
    async (): Promise<GenreSummaryListQueryResult> => {
      const { data, error } = await supabase
        .from<GenreSummary>("genreSummary")
        .select("*")
        .eq("userId", supabase.auth.user()?.id ?? "");
      if (error != null) {
        throw error;
      }
      return data ?? undefined;
    },
    options
  );
};

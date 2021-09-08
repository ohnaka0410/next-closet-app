import type { MutateOptions, QueryOptions } from "react-query";
import { useMutation, useQuery, useQueryClient } from "react-query";
import type { Calendar } from "~/@types";
import { supabase } from "~/libraries";

const key = "calendar";

type CalendarListQueryResult = Calendar[] | undefined;

export const useCalendarListQuery = (options?: QueryOptions<CalendarListQueryResult, Error>) => {
  return useQuery<CalendarListQueryResult, Error>(
    [key],
    async (): Promise<CalendarListQueryResult> => {
      const { data, error } = await supabase
        .from<Calendar>("calendar")
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

type AddCalendarMutationParams = Pick<Calendar, "date" | "itemKey">;

type AddCalendarMutationResult = Calendar;

export const useAddCalendarMutation = (
  options?: MutateOptions<AddCalendarMutationResult, Error, AddCalendarMutationParams>
) => {
  const queryClient = useQueryClient();
  return useMutation<AddCalendarMutationResult, Error, AddCalendarMutationParams>(
    async ({ ...calendar }: AddCalendarMutationParams): Promise<AddCalendarMutationResult> => {
      const { data, error } = await supabase.from<Calendar>("calendar").insert({
        ...calendar,
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
    {
      ...options,
      onSuccess: async () => {
        await queryClient.invalidateQueries([key]);
        await queryClient.invalidateQueries(["item"]);
        await queryClient.invalidateQueries(["genre", "summary"]);
      },
    }
  );
};

type DeleteCalendarMutationParams = Pick<Calendar, "date" | "itemKey">;

type DeleteCalendarMutationResult = void;

export const useDeleteCalendarMutation = (
  options?: MutateOptions<DeleteCalendarMutationResult, Error, DeleteCalendarMutationParams>
) => {
  const queryClient = useQueryClient();
  return useMutation<DeleteCalendarMutationResult, Error, DeleteCalendarMutationParams>(
    async ({ date, itemKey }: DeleteCalendarMutationParams): Promise<DeleteCalendarMutationResult> => {
      const { error } = await supabase
        .from<Calendar>("calendar")
        .delete()
        .eq("date", date)
        .eq("itemKey", itemKey)
        .eq("userId", supabase.auth.user()?.id ?? "");
      if (error != null) {
        throw error;
      }
    },
    {
      ...options,
      onSuccess: async () => {
        await queryClient.invalidateQueries([key]);
        await queryClient.invalidateQueries(["item"]);
        await queryClient.invalidateQueries(["genre", "summary"]);
      },
    }
  );
};

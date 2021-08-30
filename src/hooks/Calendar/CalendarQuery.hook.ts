import type { QueryOptions, MutateOptions } from "react-query";
import { useQuery, useMutation } from "react-query";
import type { Calendar } from "~/@types";

const key = "calendar";

type CalendarListQueryResult = Calendar[] | undefined;

export const useCalendarListQuery = (options?: QueryOptions<CalendarListQueryResult, Error>) => {
  return useQuery<CalendarListQueryResult, Error>(
    [key],
    async (): Promise<CalendarListQueryResult> => {
      // TODO
      return [];
    },
    options
  );
};

type AddCalendarMutationParams = Pick<Calendar, "date" | "itemKey">;

type AddCalendarMutationResult = void;

export const useAddCalendarMutation = (
  options?: MutateOptions<AddCalendarMutationResult, Error, AddCalendarMutationParams>
) => {
  return useMutation<AddCalendarMutationResult, Error, AddCalendarMutationParams>(
    async ({ itemKey, date }: AddCalendarMutationParams): Promise<AddCalendarMutationResult> => {
      // TODO
      console.log({ itemKey, date });
    },
    options
  );
};

type DeleteCalendarMutationParams = Pick<Calendar, "date" | "itemKey">;

type DeleteCalendarMutationResult = void;

export const useDeleteCalendarMutation = (
  options?: MutateOptions<DeleteCalendarMutationResult, Error, DeleteCalendarMutationParams>
) => {
  return useMutation<DeleteCalendarMutationResult, Error, DeleteCalendarMutationParams>(
    async ({ itemKey, date }: DeleteCalendarMutationParams): Promise<DeleteCalendarMutationResult> => {
      // TODO
      console.log({ itemKey, date });
    },
    options
  );
};

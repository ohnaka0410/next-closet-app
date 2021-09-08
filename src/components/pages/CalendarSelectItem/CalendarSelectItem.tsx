import { useRouter } from "next/router";
import { useCallback } from "react";
import { Item } from "~/@types";
import { CategoryList } from "~/components/modules/CategoryList";
import { useAddCalendarMutation } from "~/hooks/Calendar";

export type Props = {
  date: string;
  genreKey: string;
};

export const CalendarSelectItem: React.VFC<Props> = ({ date, genreKey }): JSX.Element => {
  const { back } = useRouter();
  const { mutateAsync: addCalendar } = useAddCalendarMutation();

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const handleSelectItem = useCallback(
    async (item: Item): Promise<void> => {
      await addCalendar({ itemKey: item.key, date });
      back();
      back();
    },
    [addCalendar, back, date]
  );

  return (
    <div>
      <h1>Calendar Select Item</h1>
      <div>
        <CategoryList genreKey={genreKey} onSelect={handleSelectItem} />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
      </div>
    </div>
  );
};

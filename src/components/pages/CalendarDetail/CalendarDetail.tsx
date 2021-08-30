import { useRouter } from "next/router";
import { useCallback } from "react";
import { Item } from "~/@types";
import { ItemList } from "~/components/blocks/ItemList";
import { useDeleteCalendarMutation } from "~/hooks/Calendar";
import { useItemListByDateQuery } from "~/hooks/Item";
import { pagesPath } from "~/libraries";

export type Props = {
  date: string;
};

export const CalendarDetail: React.VFC<Props> = ({ date }): JSX.Element => {
  const { push, back } = useRouter();

  const { data: itemList } = useItemListByDateQuery({ date });

  const { mutateAsync: deleteCalendar } = useDeleteCalendarMutation();

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const handleClickAddButton = useCallback((): void => {
    push(pagesPath.calendar._date(date).genre.$url());
  }, [date, push]);

  const handleSelectItem = useCallback(
    async (item: Item): Promise<void> => {
      await deleteCalendar({ itemKey: item.key, date });
    },
    [date, deleteCalendar]
  );

  return (
    <div>
      <div>
        <ItemList itemList={itemList} onSelect={handleSelectItem} />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
        <button onClick={handleClickAddButton}>Add</button>
      </div>
    </div>
  );
};

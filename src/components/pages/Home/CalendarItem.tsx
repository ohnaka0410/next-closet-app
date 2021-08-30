import { useRouter } from "next/router";
import { useCallback } from "react";
import { pagesPath } from "~/libraries";

export type Props = {
  date: string;
};

export const CalendarItem: React.VFC<Props> = ({ date }): JSX.Element => {
  const { push } = useRouter();
  const handleClick = useCallback(() => {
    push(pagesPath.calendar._date(date).$url());
  }, [date, push]);

  return (
    <li>
      <button onClick={handleClick}>{date}</button>
    </li>
  );
};

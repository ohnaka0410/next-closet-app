import { Calendar } from "~/@types";
import { useCalendarListQuery } from "~/hooks/Calendar";
import { CalendarItem } from "./CalendarItem";

export type Props = {};

export const CalendarTab: React.VFC<Props> = (): JSX.Element => {
  const { data: calendarList } = useCalendarListQuery();
  return (
    <div>
      <ul>
        {calendarList != null &&
          calendarList.map<JSX.Element>((calendar: Calendar): JSX.Element => {
            return <CalendarItem key={calendar.key} date={calendar.date} />;
          })}
      </ul>
    </div>
  );
};

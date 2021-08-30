import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { pagesPath } from "~/libraries";
import { CalendarTab } from "./CalendarTab";
import { HomeTab } from "./HomeTab";

export type Props = {};

const Tab = {
  HOME: 0,
  CALENDAR: 1,
} as const;

type Tab = typeof Tab[keyof typeof Tab];

export const Home: React.VFC<Props> = (): JSX.Element => {
  const { push } = useRouter();
  const [tab, setTab] = useState<Tab>(Tab.HOME);

  const handleClickHomeButton = useCallback((): void => {
    setTab(Tab.HOME);
  }, []);

  const handleClickCalendarButton = useCallback((): void => {
    setTab(Tab.CALENDAR);
  }, []);

  const handleClickCreateItemButton = useCallback((): void => {
    push(pagesPath.item.create.$url());
  }, [push]);

  return (
    <div>
      {tab === Tab.HOME ? <HomeTab /> : <CalendarTab />}
      <div>
        <button onClick={handleClickHomeButton} disabled={tab === Tab.HOME}>
          Home
        </button>
        <button onClick={handleClickCalendarButton} disabled={tab === Tab.CALENDAR}>
          Calendar
        </button>
        <button onClick={handleClickCreateItemButton}>Create Item</button>
      </div>
    </div>
  );
};

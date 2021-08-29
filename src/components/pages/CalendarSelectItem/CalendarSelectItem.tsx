export type Props = {
  date: string;
  genreKey: string;
};

export const CalendarSelectItem: React.VFC<Props> = ({ date, genreKey }): JSX.Element => {
  console.log({ date, genreKey });
  return <></>;
};

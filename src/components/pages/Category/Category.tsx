export type Props = {
  genreKey: string;
};

export const Category: React.VFC<Props> = ({ genreKey }): JSX.Element => {
  console.log({ genreKey });
  return <></>;
};

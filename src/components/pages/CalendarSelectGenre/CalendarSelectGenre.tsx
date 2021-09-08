import { useRouter } from "next/router";
import { useCallback } from "react";
import { Genre } from "~/@types";
import { GenreList } from "~/components/modules/GenreList";
import { pagesPath } from "~/libraries";

export type Props = {
  date: string;
};

export const CalendarSelectGenre: React.VFC<Props> = ({ date }): JSX.Element => {
  const { push, back } = useRouter();

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const handleSelect = useCallback(
    (genre: Genre): void => {
      push(pagesPath.calendar._date(date).genre._genreKey(genre.key).$url());
    },
    [date, push]
  );
  return (
    <div>
      <h1>Calendar Select Genre</h1>
      <div>
        <GenreList onSelect={handleSelect} />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
      </div>
    </div>
  );
};

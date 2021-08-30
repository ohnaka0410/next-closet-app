import { useRouter } from "next/router";
import { useCallback } from "react";
import { Genre } from "~/@types";
import { GenreList } from "~/components/modules/GenreList";
import { pagesPath } from "~/libraries";

export type Props = {};

export const HomeTab: React.VFC<Props> = (): JSX.Element => {
  const { push } = useRouter();
  const handleSelect = useCallback(
    (genre: Genre): void => {
      push(pagesPath.genre._genreKey(genre.key).$url());
    },
    [push]
  );

  return <GenreList onSelect={handleSelect} />;
};

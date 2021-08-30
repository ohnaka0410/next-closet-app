import { Genre } from "~/@types";
import { useGenreListQuery } from "~/hooks/Genre";
import { GenreListItem } from "./GenreListItem";

type Props = {
  onSelect?: (genre: Genre) => void;
};

export const GenreList: React.VFC<Props> = ({ onSelect }): JSX.Element => {
  const { data: genreList } = useGenreListQuery();
  return (
    <ul>
      {genreList != null &&
        genreList.map<JSX.Element>((genre: Genre): JSX.Element => {
          return <GenreListItem key={genre.key} genre={genre} onSelect={onSelect} />;
        })}
    </ul>
  );
};

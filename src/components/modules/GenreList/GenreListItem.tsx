import { useCallback } from "react";
import { Genre, Item } from "~/@types";
import { useItemListByGenreKeyQuery } from "~/hooks/Item";

type Props = {
  genre: Genre;
  onSelect?: (genrey: Genre) => void;
};

export const GenreListItem: React.VFC<Props> = ({ genre, onSelect }): JSX.Element => {
  const { data: itemList } = useItemListByGenreKeyQuery({ genreKey: genre.key, limit: 3 });

  const handleClick = useCallback((): void => {
    if (onSelect == null) {
      return;
    }
    onSelect(genre);
  }, [genre, onSelect]);

  return (
    <li>
      <button onClick={handleClick}>
        {genre.key} - {genre.name}
        <ul>
          {itemList != null &&
            itemList.map<JSX.Element>((item: Item): JSX.Element => {
              return <li key={item.key}>{item.key}</li>;
            })}
        </ul>
      </button>
    </li>
  );
};

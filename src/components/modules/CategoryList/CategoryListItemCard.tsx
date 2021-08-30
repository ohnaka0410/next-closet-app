import { useCallback } from "react";
import { Item } from "~/@types";

type Props = {
  item: Item;
  onSelect?: (item: Item) => void | Promise<void>;
};

export const CategoryListItemCard: React.VFC<Props> = ({ item, onSelect }): JSX.Element => {
  const handleClick = useCallback((): void => {
    if (onSelect == null) {
      return;
    }
    onSelect(item);
  }, [item, onSelect]);

  return (
    <li>
      <button onClick={handleClick}>{item.key}</button>
    </li>
  );
};

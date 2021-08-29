import { useCallback } from "react";
import { Item } from "~/@types";

type Props = {
  item: Item;
  onSelect?: (item: Item) => void;
};

export const ItemListItem: React.VFC<Props> = ({ item, onSelect }): JSX.Element => {
  const handleClick = useCallback(() => {
    if (onSelect == null) {
      return;
    }
    onSelect(item);
  }, [item, onSelect]);

  return (
    <li>
      <button onClick={onSelect != null ? handleClick : undefined}>{item.key}</button>
    </li>
  );
};

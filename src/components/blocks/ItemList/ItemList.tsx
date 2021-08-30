import { Item } from "~/@types";
import { ItemListItem } from "./ItemListItem";

type Props = {
  itemList: Item[] | undefined;
  onSelect?: (item: Item) => void | Promise<void>;
};

export const ItemList: React.VFC<Props> = ({ itemList, onSelect }): JSX.Element => {
  return (
    <ul>
      {itemList != null &&
        itemList.map<JSX.Element>((item: Item): JSX.Element => {
          return <ItemListItem key={item.key} item={item} onSelect={onSelect} />;
        })}
    </ul>
  );
};

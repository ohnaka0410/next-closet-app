import { Category, Item } from "~/@types";
import { ItemList } from "~/components/blocks/ItemList";
import { useItemListByCategoryKeyQuery } from "~/hooks/Item";

type Props = {
  category: Category;
  onSelect?: (item: Item) => void | Promise<void>;
};

export const CategoryListItem: React.VFC<Props> = ({ category, onSelect }): JSX.Element => {
  const { data: itemList } = useItemListByCategoryKeyQuery({ categoryKey: category.key });

  return (
    <li>
      <div>
        {category.key} - {category.name}
      </div>
      <ItemList itemList={itemList} onSelect={onSelect} />
    </li>
  );
};

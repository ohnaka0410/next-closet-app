import { Item } from "~/@types";
import { useCategoryQuery } from "~/hooks/Category";
import { useGenreQuery } from "~/hooks/Genre";
import { ItemDetailField } from "./ItemDetailField";

type Props = {
  item: Item | undefined;
};

export const ItemDetail: React.VFC<Props> = ({ item }): JSX.Element => {
  const { data: genre } = useGenreQuery({ genreKey: item?.genreKey });
  const { data: category } = useCategoryQuery({ categoryKey: item?.categoryKey });

  return (
    <table>
      <tbody>
        <ItemDetailField label="genre">{genre?.name}</ItemDetailField>
        <ItemDetailField label="category">{category?.name}</ItemDetailField>
        <ItemDetailField label="brand">{item?.brand}</ItemDetailField>
        <ItemDetailField label="size">{item?.size}</ItemDetailField>
        <ItemDetailField label="price">{item?.price}</ItemDetailField>
        <ItemDetailField label="purchaseDate">{item?.purchaseDate}</ItemDetailField>
        <ItemDetailField label="initialUseCount">{item?.initialUseCount}</ItemDetailField>
        <ItemDetailField label="useCount">{item?.useCount}</ItemDetailField>
        <ItemDetailField label="totalUseCount">{item?.totalUseCount}</ItemDetailField>
      </tbody>
    </table>
  );
};

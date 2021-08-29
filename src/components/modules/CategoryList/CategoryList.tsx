import { Category, Item } from "~/@types";
import { useCategoryListByGenreQuery } from "~/hooks/Category";
import { CategoryListItem } from "./CategoryListItem";

type Props = {
  genreKey: string | undefined;
  onSelect?: (item: Item) => void;
};

export const GenreList: React.VFC<Props> = ({ genreKey, onSelect }): JSX.Element => {
  const { data: categoryList } = useCategoryListByGenreQuery({ genreKey });
  return (
    <ul>
      {categoryList != null &&
        categoryList.map<JSX.Element>((category: Category): JSX.Element => {
          return <CategoryListItem key={category.key} category={category} onSelect={onSelect} />;
        })}
    </ul>
  );
};

import { useRouter } from "next/router";
import { useCallback } from "react";
import { Item } from "~/@types";
import { CategoryList } from "~/components/modules/CategoryList";
import { pagesPath } from "~/libraries";

export type Props = {
  genreKey: string;
};

export const Category: React.VFC<Props> = ({ genreKey }): JSX.Element => {
  const { push, back } = useRouter();

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const handleSelectItem = useCallback(
    (item: Item): void => {
      push(pagesPath.item.detail._itemKey(item.key).$url());
    },
    [push]
  );

  return (
    <div>
      <div>
        <CategoryList genreKey={genreKey} onSelect={handleSelectItem} />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
      </div>
    </div>
  );
};

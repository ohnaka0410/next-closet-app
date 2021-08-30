import { useRouter } from "next/router";
import { useCallback } from "react";
import { ItemDetail as Detail } from "~/components/modules/ItemDetail";
import { useDeleteItemMutation, useItemQuery } from "~/hooks/Item";
import { pagesPath } from "~/libraries";

export type Props = {
  itemKey: string;
};

export const ItemDetail: React.VFC<Props> = ({ itemKey }): JSX.Element => {
  const { push, back } = useRouter();
  const { data: item } = useItemQuery({ itemKey });
  const { mutateAsync: deleteItem } = useDeleteItemMutation();

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const handleClickEditButton = useCallback((): void => {
    push(pagesPath.item.edit._itemKey(itemKey).$url());
  }, [itemKey, push]);

  const handleClickDeleteButton = useCallback(async (): Promise<void> => {
    await deleteItem({ itemKey });
    back();
  }, [back, deleteItem, itemKey]);

  return (
    <div>
      <div>
        <Detail item={item} />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
        <button onClick={handleClickEditButton}>Edit</button>
        <button onClick={handleClickDeleteButton}>Delete</button>
      </div>
    </div>
  );
};

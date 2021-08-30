import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import type { ItemInputValue, ItemIsEditValue } from "~/components/modules/ItemInput";
import { defaultInputValue, defaultIsEditValue, ItemInput } from "~/components/modules/ItemInput";
import { useItemQuery, useUpdateItemMutation } from "~/hooks/Item";

export type Props = {
  itemKey: string;
};

export const ItemEdit: React.VFC<Props> = ({ itemKey }): JSX.Element => {
  const { back } = useRouter();
  const { data: item } = useItemQuery({ itemKey });

  const [inputValue, setInputValue] = useState<ItemInputValue>(defaultInputValue);

  const [isEditValue, setIsEditValue] = useState<ItemIsEditValue>(defaultIsEditValue);

  useEffect(() => {
    if (item == null) {
      return;
    }
    const { price, initialUseCount, ...args } = item;
    setInputValue({
      ...args,
      price: String(price),
      initialUseCount: String(initialUseCount),
    });
  }, [item]);

  const handleChangeInputValue = useCallback(
    (callback: (prev: ItemInputValue) => ItemInputValue): void => {
      if (item == null) {
        return;
      }
      setInputValue((prev: ItemInputValue): ItemInputValue => {
        return callback(prev);
      });
    },
    [item]
  );

  const handleChangeToggleIsEditValue = useCallback(
    (callback: (prev: ItemIsEditValue) => ItemIsEditValue): void => {
      if (item == null) {
        return;
      }
      setIsEditValue((prev: ItemIsEditValue): ItemIsEditValue => {
        return callback(prev);
      });
    },
    [item]
  );

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const { mutateAsync: updateItem } = useUpdateItemMutation();

  const handleClickSaveButton = useCallback(async (): Promise<void> => {
    if (item == null) {
      return;
    }
    const { genreKey, categoryKey, price, initialUseCount, ...args } = inputValue;
    await updateItem({
      ...args,
      key: item.key,
      genreKey: genreKey || "",
      categoryKey: categoryKey || "",
      price: parseInt(price, 10),
      initialUseCount: parseInt(initialUseCount, 10),
    });
    back();
  }, [item, inputValue, updateItem, back]);

  return (
    <div>
      <div>
        <ItemInput
          inputValue={inputValue}
          onChangeInputValue={handleChangeInputValue}
          isEditValue={isEditValue}
          onChangeToggleIsEditValue={handleChangeToggleIsEditValue}
        />
      </div>
      <div>
        <button onClick={handleClickBackButton}>Back</button>
        <button onClick={handleClickSaveButton}>Save</button>
      </div>
    </div>
  );
};

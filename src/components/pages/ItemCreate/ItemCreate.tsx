import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import type { ItemInputValue, ItemIsEditValue } from "~/components/modules/ItemInput";
import { defaultInputValue, defaultIsEditValue, ItemInput } from "~/components/modules/ItemInput";
import { useCreateItemMutation } from "~/hooks/Item";

export type Props = {};

export const ItemCreate: React.VFC<Props> = (): JSX.Element => {
  const { back } = useRouter();

  const [inputValue, setInputValue] = useState<ItemInputValue>(defaultInputValue);

  const [isEditValue, setIsEditValue] = useState<ItemIsEditValue>(defaultIsEditValue);

  const handleChangeInputValue = useCallback((callback: (prev: ItemInputValue) => ItemInputValue): void => {
    setInputValue((prev: ItemInputValue): ItemInputValue => {
      return callback(prev);
    });
  }, []);

  const handleChangeToggleIsEditValue = useCallback((callback: (prev: ItemIsEditValue) => ItemIsEditValue): void => {
    setIsEditValue((prev: ItemIsEditValue): ItemIsEditValue => {
      return callback(prev);
    });
  }, []);

  const handleClickBackButton = useCallback((): void => {
    back();
  }, [back]);

  const { mutateAsync: createItem } = useCreateItemMutation();

  const handleClickSaveButton = useCallback(async (): Promise<void> => {
    const { genreKey, categoryKey, price, initialUseCount, ...args } = inputValue;
    await createItem({
      ...args,
      genreKey: genreKey || "",
      categoryKey: categoryKey || "",
      price: parseInt(price, 10),
      initialUseCount: parseInt(initialUseCount, 10),
    });
    back();
  }, [back, createItem, inputValue]);

  return (
    <div>
      <h1>Item Create</h1>
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

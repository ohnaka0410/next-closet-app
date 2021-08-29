import { useCallback } from "react";
import { Category, Genre, Item } from "~/@types";
import { useCategoryListByGenreQuery } from "~/hooks/Category";
import { useGenreListQuery } from "~/hooks/Genre";
import { ItemInputField } from "./ItemInputField";

export type ItemInputValue = Pick<Item, "brand" | "size" | "purchaseDate"> & {
  genreKey: string | undefined;
  categoryKey: string | undefined;
  price: string;
  initialUseCount: string;
  imageFile?: File;
};

export type ItemIsEditValue = Record<keyof Omit<ItemInputValue, "imageFile">, boolean>;

type Props = {
  inputValue: ItemInputValue;
  onChangeInputValue: (callback: (prev: ItemInputValue) => ItemInputValue) => void;
  isEditValue: ItemIsEditValue;
  onChangeToggleIsEditValue: (callback: (prev: ItemIsEditValue) => ItemIsEditValue) => void;
};

export const ItemInput: React.VFC<Props> = ({
  inputValue,
  onChangeInputValue,
  isEditValue,
  onChangeToggleIsEditValue,
}): JSX.Element => {
  const { data: genreList } = useGenreListQuery();

  const handleChangeGenreKey = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          genreKey: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditGenreKey = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.genreKey) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            genreKey: undefined,
          };
        });
      }

      return {
        ...prevIsEditValue,
        genreKey: !prevIsEditValue.genreKey,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const { data: categoryist } = useCategoryListByGenreQuery({ genreKey: inputValue.genreKey });

  const handleChangeCategoryKey = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          categoryKey: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditCategoryKey = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.categoryKey) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            categoryKey: undefined,
          };
        });
      }

      return {
        ...prevIsEditValue,
        categoryKey: !prevIsEditValue.categoryKey,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const handleChangeBrand = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          brand: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditBrand = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.brand) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            brand: "",
          };
        });
      }

      return {
        ...prevIsEditValue,
        brand: !prevIsEditValue.brand,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const handleChangeSize = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          size: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditSize = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.size) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            size: "",
          };
        });
      }

      return {
        ...prevIsEditValue,
        size: !prevIsEditValue.size,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const handleChangePrice = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          price: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditPrice = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.price) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            price: "",
          };
        });
      }

      return {
        ...prevIsEditValue,
        price: !prevIsEditValue.price,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const handleChangePurchaseDate = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          purchaseDate: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditPurchaseDate = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.purchaseDate) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            purchaseDate: "",
          };
        });
      }

      return {
        ...prevIsEditValue,
        purchaseDate: !prevIsEditValue.purchaseDate,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  const handleChangeInitialUseCount = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue((prev: ItemInputValue): ItemInputValue => {
        return {
          ...prev,
          initialUseCount: value,
        };
      });
    },
    [onChangeInputValue]
  );

  const handleChangeIsEditInitialUseCount = useCallback(() => {
    onChangeToggleIsEditValue((prevIsEditValue: ItemIsEditValue): ItemIsEditValue => {
      if (prevIsEditValue.initialUseCount) {
        onChangeInputValue((prevInputValue: ItemInputValue): ItemInputValue => {
          return {
            ...prevInputValue,
            initialUseCount: "",
          };
        });
      }

      return {
        ...prevIsEditValue,
        initialUseCount: !prevIsEditValue.initialUseCount,
      };
    });
  }, [onChangeInputValue, onChangeToggleIsEditValue]);

  return (
    <>
      <ItemInputField label={"genre"} isEdit={isEditValue.genreKey} onChangeToggleIsEdit={handleChangeIsEditGenreKey}>
        <select value={inputValue.genreKey} onChange={handleChangeGenreKey}>
          {genreList != null &&
            genreList.map<JSX.Element>((genre: Genre): JSX.Element => {
              return (
                <option key={genre.key} value={genre.key}>
                  {genre.name}
                </option>
              );
            })}
        </select>
      </ItemInputField>
      <ItemInputField
        label={"category"}
        isEdit={isEditValue.categoryKey}
        onChangeToggleIsEdit={handleChangeIsEditCategoryKey}
      >
        <select value={inputValue.categoryKey} onChange={handleChangeCategoryKey}>
          {categoryist != null &&
            categoryist.map<JSX.Element>((category: Category): JSX.Element => {
              return (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </ItemInputField>
      <ItemInputField label={"brand"} isEdit={isEditValue.brand} onChangeToggleIsEdit={handleChangeIsEditBrand}>
        <input value={inputValue.brand} onChange={handleChangeBrand} />
      </ItemInputField>
      <ItemInputField label={"size"} isEdit={isEditValue.size} onChangeToggleIsEdit={handleChangeIsEditSize}>
        <input value={inputValue.size} onChange={handleChangeSize} />
      </ItemInputField>
      <ItemInputField label={"price"} isEdit={isEditValue.price} onChangeToggleIsEdit={handleChangeIsEditPrice}>
        <input type="number" value={inputValue.price} onChange={handleChangePrice} />
      </ItemInputField>
      <ItemInputField
        label={"purchase date"}
        isEdit={isEditValue.purchaseDate}
        onChangeToggleIsEdit={handleChangeIsEditPurchaseDate}
      >
        <input type="date" value={inputValue.purchaseDate} onChange={handleChangePurchaseDate} />
      </ItemInputField>
      <ItemInputField
        label={"initial use count"}
        isEdit={isEditValue.initialUseCount}
        onChangeToggleIsEdit={handleChangeIsEditInitialUseCount}
      >
        <input type="number" value={inputValue.initialUseCount} onChange={handleChangeInitialUseCount} />
      </ItemInputField>
    </>
  );
};

import { useCallback } from "react";

type Props = {
  children: React.ReactNode;
  label: React.ReactNode;
  isEdit: boolean;
  onChangeToggleIsEdit: () => void;
};

export const ItemInputField: React.VFC<Props> = ({ children, label, isEdit, onChangeToggleIsEdit }): JSX.Element => {
  const handleClick = useCallback(() => {
    onChangeToggleIsEdit();
  }, [onChangeToggleIsEdit]);

  return (
    <div>
      <label>
        <div>{label}</div>
        <div>
          {isEdit && <>{children}</>}
          <button onClick={handleClick}>{isEdit ? "X" : "+"}</button>
        </div>
      </label>
    </div>
  );
};

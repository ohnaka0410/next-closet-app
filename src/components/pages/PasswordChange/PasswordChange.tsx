import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useAuthPasswordChangeMutation } from "~/hooks/Auth";
import { pagesPath } from "~/libraries";

type InputValue = {
  password: string;
};

export type Props = {};

export const PasswordChange: React.VFC<Props> = (): JSX.Element => {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<InputValue>({ password: "" });
  const { mutateAsync: passwordChange } = useAuthPasswordChangeMutation();

  const handleChangePassword = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        password: value,
      };
    });
  }, []);

  const handleClickUpdatePasswordButton = useCallback(async (): Promise<void> => {
    await passwordChange({ ...inputValue });
    await push(pagesPath.$url());
  }, [inputValue, passwordChange, push]);

  return (
    <div>
      <h1>Password Change</h1>
      <div>
        <form>
          <div>
            <input type="password" required value={inputValue.password} onChange={handleChangePassword} />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleClickUpdatePasswordButton}>change password</button>
        </div>
      </div>
    </div>
  );
};

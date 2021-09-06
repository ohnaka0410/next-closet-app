import { useCallback, useState } from "react";
import { useAuthSignInMutation } from "~/hooks/Auth";

type InputValue = {
  email: string;
  password: string;
};

export type Props = {};

export const Signin: React.VFC<Props> = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<InputValue>({ email: "", password: "" });
  const { mutateAsync: signIn } = useAuthSignInMutation();

  const handleChangeEmail = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        email: value,
      };
    });
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        password: value,
      };
    });
  }, []);

  const handleClickSigninButton = useCallback(async (): Promise<void> => {
    await signIn({ ...inputValue });
  }, [inputValue, signIn]);

  return (
    <div>
      <div>
        <input type="email" value={inputValue.email} onChange={handleChangeEmail} />
        <input type="password" value={inputValue.password} onChange={handleChangePassword} />
      </div>
      <div>
        <button onClick={handleClickSigninButton}>Sign In</button>
      </div>
    </div>
  );
};

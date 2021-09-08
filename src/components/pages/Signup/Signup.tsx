import { useCallback, useState } from "react";
import { useAuthSignUpMutation } from "~/hooks/Auth";
import Link from "next/link";
import { pagesPath } from "~/libraries";

type InputValue = {
  email: string;
  password: string;
};

export type Props = {};

export const Signup: React.VFC<Props> = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<InputValue>({ email: "", password: "" });
  const { mutateAsync: signUp } = useAuthSignUpMutation();

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

  const handleClickSignupButton = useCallback(async (): Promise<void> => {
    await signUp({ ...inputValue });
  }, [inputValue, signUp]);

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form>
          <div>
            <input type="email" required value={inputValue.email} onChange={handleChangeEmail} />
          </div>
          <div>
            <input type="password" required value={inputValue.password} onChange={handleChangePassword} />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleClickSignupButton}>Sign Up</button>
        </div>
        <div>
          <Link href={pagesPath.signin.$url()}>to SignIn</Link>
        </div>
      </div>
    </div>
  );
};

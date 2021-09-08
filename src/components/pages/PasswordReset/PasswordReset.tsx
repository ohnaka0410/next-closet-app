import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useAuthPasswordRecoveryMutation } from "~/hooks/Auth";
import { pagesPath } from "~/libraries";

type InputValue = {
  email: string;
};

export type Props = {};

export const PasswordReset: React.VFC<Props> = (): JSX.Element => {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<InputValue>({ email: "" });
  const { mutateAsync: recovery } = useAuthPasswordRecoveryMutation();

  const handleChangeEmail = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue((prev: InputValue): InputValue => {
      return {
        ...prev,
        email: value,
      };
    });
  }, []);

  const handleClickRecoveryButton = useCallback(async (): Promise<void> => {
    await recovery({ ...inputValue });
    await push(pagesPath.signin.$url());
  }, [inputValue, push, recovery]);

  return (
    <div>
      <h1>Password Recovery</h1>
      <div>
        <form>
          <div>
            <input type="email" required value={inputValue.email} onChange={handleChangeEmail} />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleClickRecoveryButton}>send reset password mail</button>
        </div>
        <div>
          <Link href={pagesPath.signin.$url()}>to SignIn</Link>
        </div>
        <div>
          <Link href={pagesPath.signup.$url()}>to SignUp</Link>
        </div>
      </div>
    </div>
  );
};

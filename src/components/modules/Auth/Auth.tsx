import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { pagesPath, supabase } from "~/libraries";

type Props = {
  children: ReactElement;
};

const isPublicPathname = (pathname: string): boolean => {
  return (
    pathname === pagesPath.signin.$url().pathname ||
    pathname === pagesPath.signup.$url().pathname ||
    pathname === pagesPath.password_reset.$url().pathname
  );
};

const isPrivatePathname = (pathname: string): boolean => {
  return (
    pathname !== pagesPath.signin.$url().pathname &&
    pathname !== pagesPath.signup.$url().pathname &&
    pathname !== pagesPath.password_reset.$url().pathname
  );
};

export const Auth: React.VFC<Props> = ({ children }): JSX.Element => {
  const { pathname, push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null): void => {
    console.log({ key: "onAuthStateChange", event, session, pathname });
    const user = session?.user;
    if (user != null && event === "PASSWORD_RECOVERY" && pathname !== pagesPath.password_change.$url().pathname) {
      push(pagesPath.password_change.$url());
    } else if (user != null && !isPrivatePathname(pathname)) {
      // logged in
      push(pagesPath.$url().pathname);
    } else if (user == null && !isPublicPathname(pathname)) {
      push(pagesPath.signin.$url());
    }
  });

  useEffect(
    () => {
      (async () => {
        const user = supabase.auth.user();
        console.log({ key: "useEffect", user, pathname });
        if (user != null && !isPrivatePathname(pathname)) {
          await push(pagesPath.$url().pathname);
        } else if (user == null && !isPublicPathname(pathname)) {
          await push(pagesPath.signin.$url().pathname);
        }
        setLoading(false);
      })();
    },
    // only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  if (loading) {
    return <>loading...</>;
  }
  return <>{children}</>;
};

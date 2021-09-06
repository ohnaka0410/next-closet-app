import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { supabase } from "~/libraries";

type Props = {
  children: ReactElement;
};

export const Auth: React.VFC<Props> = ({ children }): JSX.Element => {
  const { pathname, push } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null): void => {
    const user = session?.user;
    if (user != null && (pathname === "/signin" || pathname === "/signup")) {
      push("/");
    } else if (user == null && pathname !== "/signup") {
      push("/signin");
    }
  });

  useEffect(() => {
    (async () => {
      const user = supabase.auth.user();
      if (user != null && (pathname === "/signin" || pathname === "/signup")) {
        await push("/");
      } else if (user == null && pathname !== "/signup") {
        await push("/signin");
      }
      setLoading(false);
    })();
  }, [pathname, push]);

  if (loading) {
    return <>loading...</>;
  }
  return <>{children}</>;
};

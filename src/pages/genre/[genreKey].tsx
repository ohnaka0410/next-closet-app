import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/Category";
import { Category } from "~/components/pages/Category";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <Category {...props} />;
};

export default Page;

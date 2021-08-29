import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/ItemDetail";
import { ItemDetail } from "~/components/pages/ItemDetail";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <ItemDetail {...props} />;
};

export default Page;

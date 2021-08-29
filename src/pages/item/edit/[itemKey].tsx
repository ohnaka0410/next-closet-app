import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/ItemEdit";
import { ItemEdit } from "~/components/pages/ItemEdit";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <ItemEdit {...props} />;
};

export default Page;

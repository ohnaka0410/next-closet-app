import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/CalendarSelectItem";
import { CalendarSelectItem } from "~/components/pages/CalendarSelectItem";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <CalendarSelectItem {...props} />;
};

export default Page;

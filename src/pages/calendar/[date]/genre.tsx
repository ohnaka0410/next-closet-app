import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/CalendarSelectGenre";
import { CalendarSelectGenre } from "~/components/pages/CalendarSelectGenre";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <CalendarSelectGenre {...props} />;
};

export default Page;

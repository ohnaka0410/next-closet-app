import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Props } from "~/components/pages/CalendarDetail";
import { CalendarDetail } from "~/components/pages/CalendarDetail";

const Page: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const props = query as Props;
  return <CalendarDetail {...props} />;
};

export default Page;

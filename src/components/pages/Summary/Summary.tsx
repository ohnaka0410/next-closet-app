import { ItemList } from "~/components/blocks/ItemList";
import { useBestUseTotalCountItemListQuery, useWorstUseTotalCountItemListQuery } from "~/hooks/Item";
import { ClosetSummary } from "./ClosetSummary";

export type Props = {};

export const Summary: React.VFC<Props> = (): JSX.Element => {
  const { data: bestUseTotalCountItemList } = useBestUseTotalCountItemListQuery();
  const { data: worstUseTotalCountItemList } = useWorstUseTotalCountItemListQuery();
  return (
    <div>
      <ClosetSummary />
      <ItemList itemList={bestUseTotalCountItemList} />
      <ItemList itemList={worstUseTotalCountItemList} />
    </div>
  );
};

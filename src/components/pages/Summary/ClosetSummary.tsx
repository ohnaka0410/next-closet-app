import type { GenreSummary } from "~/@types";
import { useGenreSummaryListQuery } from "~/hooks/Genre";
import { useItemSummaryQuery } from "~/hooks/Item";

export type Props = {};

export const ClosetSummary: React.VFC<Props> = (): JSX.Element => {
  const { data: closetSummary } = useItemSummaryQuery();
  const { data: genreSummaryList } = useGenreSummaryListQuery();

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>count</th>
              <td>{closetSummary?.count}</td>
            </tr>
            <tr>
              <th>price</th>
              <td>{closetSummary?.price}</td>
            </tr>
            <tr>
              <th>totalUseCount</th>
              <td>{closetSummary?.totalUseCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>genreName</th>
              <th>itemCount</th>
              <th>itemTotalUsedCount</th>
            </tr>
          </thead>
          <tbody>
            {genreSummaryList != null &&
              genreSummaryList.map<JSX.Element>((genre: GenreSummary): JSX.Element => {
                return (
                  <tr key={genre.key}>
                    <th>{genre.name}</th>
                    <th>{genre.itemCount}</th>
                    <th>{genre.itemTotalUseCount}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

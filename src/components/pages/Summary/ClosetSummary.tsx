import type { Genre } from "~/@types";
import { useGenreListQuery } from "~/hooks/Genre";
import { useItemSummaryQuery } from "~/hooks/Item";

export type Props = {};

export const ClosetSummary: React.VFC<Props> = (): JSX.Element => {
  const { data: closetSummary } = useItemSummaryQuery();
  const { data: genreList } = useGenreListQuery();

  return (
    <div>
      <div>
        <table>
          <tbody>
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
            {genreList != null &&
              genreList.map<JSX.Element>((genre: Genre): JSX.Element => {
                return (
                  <tr key={genre.key}>
                    <th>{genre.name}</th>
                    <th>{genre.itemCount}</th>
                    <th>{genre.itemTotalUsedCount}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

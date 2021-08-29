type Props = {
  children: React.ReactNode | undefined;
  label: string;
};

export const ItemDetailField: React.VFC<Props> = ({ children, label }): JSX.Element => {
  return (
    <tr>
      <th>{label}</th>
      <td>{children}</td>
    </tr>
  );
};

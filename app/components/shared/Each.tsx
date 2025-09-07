import React from "react";

interface EachProps<T> {
  of: T[];
  render: (item: T, index: number) => React.ReactNode;
}

function Each<T>({ of, render }: EachProps<T>): React.ReactElement {
  return <>{of.map((item, index) => render(item, index))}</>;
}

export default Each;

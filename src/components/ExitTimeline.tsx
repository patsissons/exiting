import { ExitRow } from "types";
import { ExitPresenter } from "./ExitPresenter";

export interface Props {
  exits: ExitRow[];
}

export function ExitTimeline({ exits }: Props) {
  return (
    <>
      {exits.map((exit) => (
        <ExitPresenter key={exit.id} exit={exit} />
      ))}
    </>
  );
}

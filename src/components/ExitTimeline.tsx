import { Exit } from "types";
import { ExitPresenter } from "./ExitPresenter";

export interface Props {
  exits: Exit[];
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

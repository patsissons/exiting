import { Text } from "@shopify/polaris";
import { ExitContent } from "types";
import { ExitPresenter } from "./ExitPresenter";

export interface Props {
  exits: ExitContent[];
}

export function ExitTimeline({ exits }: Props) {
  if (exits.length === 0) {
    return (
      <Text
        as="h2"
        variant="bodyLg"
        color="subdued"
        fontWeight="bold"
        alignment="center"
      >
        No exits yet, add yours to be the first!
      </Text>
    );
  }

  return (
    <>
      {exits.map((exit) => (
        <ExitPresenter key={exit.id} exit={exit} />
      ))}
    </>
  );
}

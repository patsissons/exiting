import { Button, ButtonGroup, Card, Stack } from "@shopify/polaris";
import { Exit } from "types";
import { MarkdownPreview } from "./MarkdownPreview";
import { Tags } from "./Tags";

export interface Props {
  exit: Exit;
}

export function ExitPresenter({ exit: { id, markdown, tags } }: Props) {
  return (
    <Card>
      <Card.Section>
        <MarkdownPreview source={markdown} />
      </Card.Section>
      <Card.Section>
        <Stack>
          <Stack.Item fill>
            <Tags tags={tags} />
          </Stack.Item>
          <ButtonGroup>
            <Button url={`/${id}`} plain>
              Permalink
            </Button>
          </ButtonGroup>
        </Stack>
      </Card.Section>
    </Card>
  );
}

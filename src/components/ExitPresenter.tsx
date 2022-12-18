import { Button, ButtonGroup, Card, Stack, Tooltip } from "@shopify/polaris";
import moment from "moment";
import { ExitContent } from "types";
import { MarkdownPreview } from "./MarkdownPreview";
import { Tags } from "./Tags";

export interface Props {
  exit: ExitContent;
}

export function ExitPresenter({
  exit: { id, created_at, updated_at, markdown, tags },
}: Props) {
  return (
    <Card>
      <Card.Section>
        <MarkdownPreview style={{ padding: "0.5rem" }} source={markdown} />
      </Card.Section>
      <Card.Section>
        <Stack>
          <Stack.Item fill>{tags && <Tags tags={tags} />}</Stack.Item>
          {renderTimestamp()}
          <ButtonGroup>
            <Button url={`/${id}`} plain>
              Permalink
            </Button>
          </ButtonGroup>
        </Stack>
      </Card.Section>
    </Card>
  );

  function renderTimestamp() {
    const created = moment(created_at);
    const createdMarkup = (
      <Tooltip content={created.toString()}>
        <span>{created.fromNow()}</span>
      </Tooltip>
    );

    if (created_at === updated_at) {
      return createdMarkup;
    }

    const updated = moment(updated_at);

    return (
      <>
        {createdMarkup}
        <Tooltip content={updated.toString()}>
          <span> (last updated {updated.fromNow()})</span>
        </Tooltip>
      </>
    );
  }
}

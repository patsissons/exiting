import { Card, Banner, TextField, Stack } from "@shopify/polaris";
import {
  useField,
  useForm,
  submitSuccess,
  submitFail,
} from "@shopify/react-form";
import { MarkdownEditor } from "./MarkdownEditor";
import { ExitInsert, ExitRow, ExitUpdate } from "types";
import { sanitizeTag } from "utils/tags";
import { logging } from "utils/logging";
import { useToast } from "hooks/toast";
import { useState } from "react";

const defaultMarkdown = `
<!--
  Welcome to exiting.fyi
    - write your anonymous exiting guidance
    - add any relevant tags
    - and post it to the world!
-->
`.trimStart();

export interface Props {
  exit?: ExitInsert | ExitUpdate;
  post(exit: ExitInsert | ExitUpdate): Promise<ExitRow>;
}

export function ExitEditor({ exit, post }: Props) {
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const {
    dirty,
    fields,
    reset,
    submit,
    // submitErrors and submitting are not working right now
    // submitErrors,
    // submitting,
  } = useForm({
    fields: {
      markdown: useField(exit?.markdown || defaultMarkdown),
      tags: useField(exit?.tags ? exit.tags.join(",") : ""),
    },
    onSubmit: async ({ markdown, tags }) => {
      try {
        setSubmitting(true);
        setSubmitError(undefined);
        const tagList = tags.split(",").map(sanitizeTag);
        logging.debug("submitting post", { markdown, tagList });
        const exit = await post({ markdown, tags: tagList });
        show({
          content: "Post submitted",
          dismissible: true,
          action: { url: `/${exit.id}`, content: "Permalink" },
        });

        return submitSuccess();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        show({
          content: "Post submission failed",
          dismissible: true,
          error: true,
        });
        setSubmitError(message);
        return submitFail();
      } finally {
        setSubmitting(false);
      }
    },
  });

  const submitDisabled = submitting || !dirty;

  return (
    <Card
      primaryFooterAction={{
        content: "Submit",
        disabled: submitDisabled,
        onAction: submit,
      }}
      secondaryFooterActions={[
        { content: "Reset", disabled: !dirty, onAction: reset },
      ]}
    >
      <Card.Section>
        <Stack vertical spacing="extraTight">
          {submitError && (
            <Banner status="critical" title="Submission error">
              <p>{submitError}</p>
            </Banner>
          )}
          <MarkdownEditor
            minHeight="500px"
            visible
            editable={!submitting}
            value={fields.markdown.value}
            onChange={fields.markdown.onChange}
          />
        </Stack>
      </Card.Section>
      <Card.Section>
        <TextField
          id="tags"
          autoComplete="false"
          label="Tags"
          {...fields.tags}
        />
      </Card.Section>
    </Card>
  );
}

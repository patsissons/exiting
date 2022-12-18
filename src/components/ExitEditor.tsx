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
    - full markdown is supported
    - add any relevant tags
    - submit your exiting message
    - after submit, save the edit token
    - use the edit token to submit future changes
-->
`.trimStart();

export interface Props {
  exit?: ExitInsert | ExitUpdate;
  submitExit(exit: ExitInsert | ExitUpdate): Promise<ExitRow>;
}

export function ExitEditor({ exit, submitExit }: Props) {
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const editToken = useField("");
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
    onSubmit: async ({ markdown, tags: tagList = "" }) => {
      try {
        setSubmitting(true);
        setSubmitError(undefined);
        const tags = tagList
          .split(",")
          .map((tag) => tag.trim())
          .map(sanitizeTag)
          .filter(Boolean);
        const exitData = exit
          ? ({
              id: exit?.id,
              edit_token: editToken.value,
              markdown,
              tags,
            } as ExitUpdate)
          : ({
              markdown,
              tags,
            } as ExitInsert);

        logging.debug("submitting post", exitData);
        const submittedExit = await submitExit(exitData);
        show({
          content: "Post submitted",
          dismissible: true,
          action: { url: `/${submittedExit.id}`, content: "Permalink" },
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

  const submitDisabled = isSubmitDisabled();

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
          placeholder="Comma separated list of tags"
          {...fields.tags}
        />
      </Card.Section>
      {exit && (
        <Card.Section>
          <TextField
            id="editToken"
            autoComplete="false"
            label="Edit Token"
            placeholder="Enter the edit token that was generated on the first submit"
            {...editToken}
          />
        </Card.Section>
      )}
    </Card>
  );

  function isSubmitDisabled() {
    if (exit && !editToken.dirty) return true;

    return submitting || !dirty;
  }
}

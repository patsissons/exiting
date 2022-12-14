import { Card, Banner, TextField, Stack, InlineError } from "@shopify/polaris";
import { useToast } from "hooks/toast";
import { useCallback, useEffect, useState } from "react";
import { ExitInsert, ExitRow, ExitUpdate } from "types";
import { MAX_EXIT_CONTENT_LENGTH } from "utils/exits";
import { logging } from "utils/logging";
import { MAX_TAGS_PER_EXIT, tagsFromString } from "utils/tags";
import { MarkdownEditor } from "./MarkdownEditor";

const defaultMarkdownContent = `
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
  const defaultMarkdown = exit?.markdown || defaultMarkdownContent;
  const defaultTags = exit?.tags ? exit.tags.join(",") : "";

  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [dirty, setDirty] = useState(false);
  const [editTokenField, setEditTokenField] = useState("");
  const [markdownField, setMarkdownField] = useState(defaultMarkdown);
  const [tagsField, setTagsField] = useState(defaultTags);

  useEffect(() => {
    const dirty =
      markdownField !== defaultMarkdown || tagsField !== defaultTags;

    setDirty(dirty);
  }, [defaultMarkdown, defaultTags, markdownField, tagsField]);

  const reset = useCallback(() => {
    setMarkdownField(defaultMarkdown);
    setTagsField(defaultTags);
  }, [defaultMarkdown, defaultTags]);

  const tags = tagsFromString(tagsField);

  async function submit() {
    try {
      setSubmitting(true);
      setSubmitError(undefined);

      const exitData = exit
        ? ({
            id: exit?.id,
            edit_token: editTokenField,
            markdown: markdownField,
            tags,
          } as ExitUpdate)
        : ({
            markdown: markdownField,
            tags,
          } as ExitInsert);

      logging.debug("submitting post", exitData);
      const submittedExit = await submitExit(exitData);
      show({
        content: "Post submitted",
        dismissible: true,
        action: { url: `/${submittedExit.id}`, content: "Permalink" },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      show({
        content: "Post submission failed",
        dismissible: true,
        error: true,
      });
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

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
            value={markdownField}
            onChange={setMarkdownField}
          />
          {markdownField.length > MAX_EXIT_CONTENT_LENGTH ? (
            <InlineError
              message={`Markdown content is too long (${
                markdownField.length
              } chars), max allowed is ${Math.floor(
                MAX_EXIT_CONTENT_LENGTH / 1024
              )}KB `}
              fieldID="markdown"
            />
          ) : undefined}
        </Stack>
      </Card.Section>
      <Card.Section>
        <TextField
          id="tags"
          autoComplete="false"
          label="Tags"
          placeholder="Comma separated list of tags"
          value={tagsField}
          onChange={setTagsField}
          error={
            tags.length > MAX_TAGS_PER_EXIT
              ? `${MAX_TAGS_PER_EXIT} tags is the maximum allowed`
              : undefined
          }
        />
      </Card.Section>
      {exit && (
        <Card.Section>
          <TextField
            id="editToken"
            autoComplete="false"
            label="Edit Token"
            placeholder="Enter the edit token that was generated on the first submit"
            value={editTokenField}
            onChange={setEditTokenField}
          />
        </Card.Section>
      )}
    </Card>
  );

  function isSubmitDisabled() {
    if (exit && !editTokenField) return true;
    if (tags.length > MAX_TAGS_PER_EXIT) return true;
    if (markdownField.length > MAX_EXIT_CONTENT_LENGTH) return true;

    return submitting || !dirty;
  }
}

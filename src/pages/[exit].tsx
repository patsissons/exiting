import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  ErrorHandler,
  isErrorProps,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitEditor } from "components/ExitEditor";
import { ExitPresenter } from "components/ExitPresenter";
import { PageContainer } from "components/PageContainer";
import { useState } from "react";
import { queryTable } from "services/supabase";
import { ExitContent, ExitInsert, ExitUpdate } from "types";
import { submitExit } from "utils/api";

export type Props = WithErrorProps<{
  exit: ExitContent;
}>;

export default function ExitPage(props: Props) {
  const [editing, setEditing] = useState(false);
  const [updatedExit, setUpdatedExit] = useState<ExitContent>();

  if (isErrorProps(props)) {
    return <ErrorHandler {...props} />;
  }

  const exit = updatedExit || props.exit;

  return (
    <PageContainer
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
      primaryAction={{
        destructive: editing,
        content: editing ? "Cancel" : "Edit",
        onAction: toggleEditing,
      }}
    >
      {editing ? (
        <ExitEditor exit={exit} submitExit={handleSubmitExit} />
      ) : (
        <ExitPresenter exit={exit} />
      )}
    </PageContainer>
  );

  function toggleEditing() {
    setEditing((value) => !value);
  }

  async function handleSubmitExit(exit: ExitInsert | ExitUpdate) {
    const result = await submitExit(exit);

    setEditing(false);
    setUpdatedExit(result);

    return result;
  }
}

export async function getServerSideProps({
  params: { exit: exitId } = {},
}: GetServerSidePropsContext<{ exit?: string }>): Promise<
  GetServerSidePropsResult<Props>
> {
  if (!exitId) {
    return {
      props: {
        error: "Invalid exit ID",
      },
    };
  }

  const result = await queryTable("exits").eq("id", exitId);

  if (result.error) {
    return {
      props: {
        error: result.error.message,
        data: result,
      },
    };
  }

  return {
    props: {
      exit: result.data[0],
    },
  };
}

import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  ErrorHandler,
  isErrorProps,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitPresenter } from "components/ExitPresenter";
import { PageContainer } from "components/PageContainer";
import { queryTable } from "services/supabase";
import { ExitRow } from "types";
import { logging } from "utils/logging";

export type Props = WithErrorProps<{
  exit: ExitRow;
}>;

export default function ExitPage(props: Props) {
  if (isErrorProps(props)) {
    return <ErrorHandler {...props} />;
  }

  return (
    <PageContainer
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
    >
      <ExitPresenter exit={props.exit} />
    </PageContainer>
  );
}

export async function getServerSideProps({
  resolvedUrl,
  params: { exit: exitId } = {},
}: GetServerSidePropsContext<{ exit?: string }>): Promise<
  GetServerSidePropsResult<Props>
> {
  logging.debug("D", { resolvedUrl, exitId });

  if (!exitId) {
    return {
      props: {
        error: "Invalid exit ID",
      },
    };
  }

  const result = await queryTable("exits").filter("id", "eq", exitId);

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

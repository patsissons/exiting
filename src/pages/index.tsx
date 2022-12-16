import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { PageContainer } from "components/PageContainer";
import { queryTable } from "services/supabase";
import { ExitRow } from "types";
import { logging } from "utils/logging";

export type Props = WithErrorProps<{
  exits: ExitRow[];
}>;

export default function IndexPage(props: Props) {
  return (
    <PageContainer
      subtitle="Browse other exiting departure posts"
      primaryAction={{ content: "New Exit", url: "/new" }}
    >
      {isErrorProps(props) ? (
        <ErrorHandler {...props} />
      ) : (
        <ExitTimeline exits={props.exits} />
      )}
    </PageContainer>
  );
}

export async function getServerSideProps({
  resolvedUrl,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  logging.debug("D", { resolvedUrl });

  const result = await queryTable("exits");

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
      exits: result.data,
    },
  };
}

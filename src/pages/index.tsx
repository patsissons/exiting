import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { Exit } from "types";
import { isDevelopment } from "utils/env";
import { logging } from "utils/logging";
import { PageContainer } from "components/PageContainer";

export type Props = WithErrorProps<{
  exits: Exit[];
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

  if (isDevelopment) {
    return {
      props: {
        exits: [
          {
            id: "test",
            markdown: `
  # test exit

  this is a test
  `.trimStart(),
            tags: ["test", "testing"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    };
  }

  return {
    props: {
      error: "GET_exits not yet implemented",
    },
  };
}

import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  ErrorHandler,
  isErrorProps,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitPresenter } from "components/ExitPresenter";
import { Exit } from "types";
import { isDevelopment } from "utils/env";
import { logging } from "utils/logging";
import { PageContainer } from "src/components/PageContainer";

export type Props = WithErrorProps<{
  exit: Exit;
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
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  logging.debug("D", { resolvedUrl });

  if (isDevelopment && resolvedUrl === "/test") {
    return {
      props: {
        exit: {
          id: "test",
          markdown: `
# test exit

this is a test
`.trimStart(),
          tags: ["test", "testing"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }

  return {
    props: {
      error: "GET_exit not yet implemented",
      redirect: "/",
    },
  };
}

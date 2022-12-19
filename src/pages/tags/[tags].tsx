import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { Tags } from "components/Tags";
import { Exit } from "types";
import { isDevelopment } from "utils/env";
import { logging } from "utils/logging";
import { PageContainer } from "src/components/PageContainer";

export type Props = WithErrorProps<{
  exits: Exit[];
}>;

export default function TagsPage(props: Props) {
  const router = useRouter();

  if (isErrorProps(props)) {
    return <ErrorHandler {...props} />;
  }

  logging.debug("D", { router });
  const { tags = "" } = router.query;
  const tagList = Array.isArray(tags) ? tags : tags.split(",");

  return (
    <PageContainer
      titleMetadata={<Tags tags={tagList} plain />}
      subtitle="Browse other tagged exiting departure posts"
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
    >
      <ExitTimeline exits={props.exits} />
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
      error: "GET_exits_by_tag not yet implemented",
    },
  };
}

import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { PageContainer } from "components/PageContainer";
import { Tags } from "components/Tags";
import { queryTable } from "services/supabase";
import { ExitRow } from "types";
import { logging } from "utils/logging";
import { sanitizeTag } from "utils/tags";
import { arrayParam } from "src/utils/supabase";

export type Props = WithErrorProps<{
  exits: ExitRow[];
}>;

export default function TagsPage(props: Props) {
  const router = useRouter();

  if (isErrorProps(props)) {
    return <ErrorHandler {...props} />;
  }

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
  params: { tags: tagsParam } = {},
}: GetServerSidePropsContext<{ tags?: string }>): Promise<
  GetServerSidePropsResult<Props>
> {
  logging.debug("D", { resolvedUrl, tagsParam });

  if (!tagsParam) {
    return {
      props: {
        error: "Invalid tag selection",
      },
    };
  }

  const tags = decodeURIComponent(tagsParam).split(",").map(sanitizeTag);

  const result = await queryTable("exits").filter(
    "tags",
    "cs",
    arrayParam(tags)
  );

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

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
import { DEFAULT_PAGE_SIZE, queryExits } from "services/supabase";
import { ExitContent } from "types";
import { paginationOptions } from "utils/pagination";
import { arrayParam } from "utils/supabase";
import { tagsFromString } from "utils/tags";

export type Props = WithErrorProps<{
  exits: ExitContent[];
  count: number;
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
      <ExitTimeline
        exits={props.exits}
        count={props.count}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </PageContainer>
  );
}

export async function getServerSideProps({
  params: { tags: tagsParam } = {},
  query,
}: GetServerSidePropsContext<{ tags?: string }>): Promise<
  GetServerSidePropsResult<Props>
> {
  if (!tagsParam) {
    return {
      props: {
        error: "Invalid tag selection",
      },
    };
  }

  const tags = tagsFromString(decodeURIComponent(tagsParam));

  const result = await queryExits(paginationOptions(query)).filter(
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
      count: result.count || 0,
    },
  };
}

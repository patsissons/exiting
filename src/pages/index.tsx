import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { PageContainer } from "components/PageContainer";
import { DEFAULT_PAGE_SIZE, queryExits } from "services/supabase";
import { ExitContent } from "types";
import { paginationOptions } from "utils/pagination";

export type Props = WithErrorProps<{
  exits: ExitContent[];
  count: number;
}>;

export default function IndexPage(props: Props) {
  return (
    <PageContainer
      subtitle="Browse other exiting departure posts"
      action={{
        content: "New Exit",
        url: "/new",
      }}
    >
      {isErrorProps(props) ? (
        <ErrorHandler {...props} />
      ) : (
        <ExitTimeline
          exits={props.exits}
          count={props.count}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      )}
    </PageContainer>
  );
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const result = await queryExits(paginationOptions(query));

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

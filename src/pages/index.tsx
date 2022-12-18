import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  isErrorProps,
  ErrorHandler,
  WithErrorProps,
} from "components/ErrorHandler";
import { ExitTimeline } from "components/ExitTimeline";
import { PageContainer } from "components/PageContainer";
import { queryTable } from "services/supabase";
import { ExitContent } from "types";
import { buttonFrom } from "@shopify/polaris";

export type Props = WithErrorProps<{
  exits: ExitContent[];
}>;

export default function IndexPage(props: Props) {
  return (
    <PageContainer
      subtitle="Browse other exiting departure posts"
      secondaryActions={buttonFrom({
        content: "New Exit",
        url: "/new",
        outline: true,
      })}
    >
      {isErrorProps(props) ? (
        <ErrorHandler {...props} />
      ) : (
        <ExitTimeline exits={props.exits} />
      )}
    </PageContainer>
  );
}

export async function getServerSideProps({}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<Props>
> {
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

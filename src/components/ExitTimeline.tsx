import { Pagination, Text } from "@shopify/polaris";
import moment from "moment";
import { useRouter } from "next/router";
import { valueOrLast } from "src/utils/pagination";
import { ExitContent } from "types";
import { ExitPresenter } from "./ExitPresenter";

export interface Props {
  exits: ExitContent[];
  count: number;
  pageSize: number;
}

export function ExitTimeline({ exits, count, pageSize }: Props) {
  const router = useRouter();
  const after = valueOrLast(router.query.after);
  const before = valueOrLast(router.query.before);

  if (exits.length === 0) {
    return (
      <>
        <Text
          as="h2"
          variant="bodyLg"
          color="subdued"
          fontWeight="bold"
          alignment="center"
        >
          No exits yet, add yours to be the first!
        </Text>
        {renderPagination()}
      </>
    );
  }

  return (
    <>
      {exits.map((exit) => (
        <ExitPresenter key={exit.id} exit={exit} />
      ))}
      {renderPagination()}
    </>
  );

  function renderPagination() {
    return (
      <div className="Pagination">
        <Pagination
          label={label()}
          hasPrevious={hasPrevious()}
          hasNext={hasNext()}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </div>
    );

    function hasPrevious() {
      return Boolean(before || after);
    }

    function hasNext() {
      return exits.length === pageSize;
    }

    function prevPage() {
      router.back();
    }

    function nextPage() {
      router.push({
        query: {
          before: exits[exits.length - 1].created_at,
        },
      });
    }

    function label() {
      if (after) {
        return `${count} exits after ${moment(after).format("lll")}`;
      } else if (before) {
        return `${count} exits before ${moment(before).format("lll")}`;
      } else if (exits.length > 0) {
        return `${count} exits on or before ${moment(
          exits[0].created_at
        ).format("lll")}`;
      }

      return "0 exits";
    }
  }
}

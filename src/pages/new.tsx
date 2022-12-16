import { ExitEditor } from "components/ExitEditor";
import { PageContainer } from "components/PageContainer";
import { ExitInsert, ExitRow, ExitUpdate } from "types";

export default function NewPage() {
  return (
    <PageContainer
      subtitle="Anonymously post your parting guidance as you depart from your employer"
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
    >
      <ExitEditor post={handlePost} />
    </PageContainer>
  );

  async function handlePost(
    _content: ExitInsert | ExitUpdate
  ): Promise<ExitRow> {
    throw new Error("POST_exit not yet implemented");
  }
}

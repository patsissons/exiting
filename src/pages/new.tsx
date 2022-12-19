import { ExitEditor } from "components/ExitEditor";
import { PageContainer } from "src/components/PageContainer";
import { Exit, ExitContent } from "types";

export default function NewPage() {
  return (
    <PageContainer
      subtitle="Anonymously post your parting guidance as you depart from your employer"
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
    >
      <ExitEditor post={handlePost} />
    </PageContainer>
  );

  async function handlePost(_content: ExitContent): Promise<Exit> {
    throw new Error("POST_exit not yet implemented");
  }
}

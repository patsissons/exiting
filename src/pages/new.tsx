import { Banner, Stack } from "@shopify/polaris";
import { ExitEditor } from "components/ExitEditor";
import { ExitPresenter } from "components/ExitPresenter";
import { PageContainer } from "components/PageContainer";
import { useState } from "react";
import { ExitInsert, ExitRow, ExitUpdate } from "types";
import { submitExit } from "utils/api";

export default function NewPage() {
  const [exit, setExit] = useState<ExitRow>();

  return (
    <PageContainer
      subtitle="Anonymously post your parting guidance as you depart from your employer"
      breadcrumbs={[{ id: "timeline", url: "/", content: "Timeline" }]}
    >
      <Stack vertical>
        {exit && (
          <Banner title="Edit token" status="info">
            {exit.edit_token}
          </Banner>
        )}
        {exit ? (
          <ExitPresenter exit={exit} />
        ) : (
          <ExitEditor submitExit={handleSubmitExit} />
        )}
      </Stack>
    </PageContainer>
  );

  async function handleSubmitExit(exit: ExitInsert | ExitUpdate) {
    const result = await submitExit(exit);

    setExit(result);

    return result;
  }
}

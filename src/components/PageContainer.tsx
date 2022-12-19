import { Page, PageProps } from "@shopify/polaris";

export function PageContainer({
  title = "exiting.fyi",
  divider = true,
  ...props
}: PageProps) {
  return <Page title={title} divider={divider} {...props} />;
}

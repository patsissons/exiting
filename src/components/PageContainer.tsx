import { Page, PageProps } from "@shopify/polaris";
import Image from "next/image";

export function PageContainer({
  title = "exiting.fyi",
  divider = true,
  ...props
}: PageProps) {
  return (
    <Page
      title={title}
      divider={divider}
      primaryAction={
        <Image
          src="/logo.svg"
          alt="logo"
          width={36}
          height={36}
          style={{ display: "block" }}
        />
      }
      {...props}
    />
  );
}

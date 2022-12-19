import {
  buttonFrom,
  Page,
  PageProps,
  ComplexAction,
  Stack,
  Link,
} from "@shopify/polaris";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export interface Props extends Omit<PageProps, "secondaryActions"> {
  action?: ComplexAction;
}

export function PageContainer({
  title = "exiting.fyi",
  divider = true,
  action,
  ...props
}: Props) {
  const [hostUrl, setHostUrl] = useState("");

  useEffect(() => {
    setHostUrl(window.location.origin);
  }, []);

  return (
    <Page
      title={title}
      divider={divider}
      secondaryActions={
        <Stack spacing="extraTight">
          <ThemeToggle />
          {action && buttonFrom({ ...action, outline: true })}
          {renderLogo()}
        </Stack>
      }
      {...props}
    />
  );

  function renderLogo() {
    const image = (
      <Image
        src="/logo.svg"
        alt="logo"
        width={36}
        height={36}
        style={{ display: "block" }}
      />
    );

    if (!hostUrl) return image;

    return <Link url={hostUrl}>{image}</Link>;
  }
}

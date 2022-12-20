import {
  buttonFrom,
  Page,
  PageProps,
  ComplexAction,
  Stack,
  Link,
  FooterHelp,
  Text,
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
  children,
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
    >
      {children}
      <FooterHelp>
        <Text as="p" variant="bodySm" color="subdued">
          <Link url="https://exiting.fyi">exiting.fyi</Link>
          {` is an open source `}
          <Link url="https://github.com/patsissons/exiting">
            GitHub project
          </Link>
          {` built with `}
          <Link url="https://nextjs.org/">Next.js</Link>
          {` and deployed to `}
          <Link url="https://vercel.com/">Vercel</Link>.
        </Text>
      </FooterHelp>
    </Page>
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

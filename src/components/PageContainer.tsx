import {
  buttonFrom,
  Page,
  PageProps,
  ComplexAction,
  Stack,
} from "@shopify/polaris";
import Image from "next/image";
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
      secondaryActions={
        <Stack>
          <ThemeToggle />
          {action && buttonFrom({ ...action, outline: true })}
        </Stack>
      }
      {...props}
    />
  );
}

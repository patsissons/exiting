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
      secondaryActions={
        <Stack spacing="extraTight">
          <ThemeToggle />
          {action && buttonFrom({ ...action, outline: true })}
          <Image
            src="/logo.svg"
            alt="logo"
            width={36}
            height={36}
            style={{ display: "block" }}
          />
        </Stack>
      }
      {...props}
    />
  );
}

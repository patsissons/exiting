import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

export function PolarisProvider({ children }: PropsWithChildren) {
  return (
    <AppProvider i18n={enTranslations} linkComponent={Link}>
      {children}
    </AppProvider>
  );
}

function Link({ children, url, ...props }: PropsWithChildren<{ url: string }>) {
  return (
    <NextLink {...props} href={url}>
      {children}
    </NextLink>
  );
}

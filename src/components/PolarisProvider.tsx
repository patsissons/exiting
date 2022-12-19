import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { PropsWithChildren } from "react";

export function PolarisProvider({ children }: PropsWithChildren) {
  return <AppProvider i18n={enTranslations}>{children}</AppProvider>;
}

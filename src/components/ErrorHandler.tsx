import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useToast } from "hooks/toast";
import { logging } from "utils/logging";

export interface ErrorProps {
  error: string;
  data?: unknown;
  redirect?: string;
}

export type WithErrorProps<P> = P | ErrorProps;

export function ErrorHandler({ error, data, redirect }: ErrorProps) {
  const { show } = useToast();
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (!handled.current) {
      logging.error(error, data);
      const content = data
        ? `${error}\n\n${JSON.stringify(data, null, 2)}`
        : error;
      show({ content, error: true });

      if (redirect) {
        router.replace(redirect);
      }

      handled.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function isErrorProps(props: any): props is ErrorProps {
  return typeof props === "object" && "error" in props;
}

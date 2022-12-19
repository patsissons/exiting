import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useToast } from "hooks/toast";

export interface ErrorProps {
  error: string;
  redirect?: string;
}

export type WithErrorProps<P> = P | ErrorProps;

export function ErrorHandler({ error, redirect }: ErrorProps) {
  const { show } = useToast();
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (!handled.current) {
      show({ content: error, error: true });

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

import { Button, ButtonGroup } from "@shopify/polaris";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      document.documentElement.setAttribute("data-color-mode", resolvedTheme);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ButtonGroup segmented>
      <Button
        pressed={resolvedTheme === "light"}
        onClick={() => handleThemeToggle("light")}
      >
        ☀
      </Button>
      <Button
        pressed={resolvedTheme === "dark"}
        onClick={() => handleThemeToggle("dark")}
      >
        ☾
      </Button>
    </ButtonGroup>
  );

  function handleThemeToggle(theme: "light" | "dark") {
    setTheme(theme);
  }
}

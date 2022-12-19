export const MAX_TAGS_PER_EXIT = 25;

export function sanitizeTag(input: string) {
  return input.replace(/[^\w- ]/g, "");
}

export function tagsFromArray(tags: string[]): string[];
export function tagsFromArray(tags?: string[] | null): string[] | undefined;
export function tagsFromArray(tags?: string[] | null) {
  return tags?.slice(0, MAX_TAGS_PER_EXIT);
}

export function tagsFromString(input: string) {
  return tagsFromArray(
    Array.from(
      new Set(
        input
          .split(",")
          .map((tag) => tag.trim())
          .map(sanitizeTag)
          .filter(Boolean)
      )
    )
  );
}

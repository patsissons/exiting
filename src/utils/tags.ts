export function sanitizeTag(input: string) {
  return input.replace(/[^\w- ]/g, "");
}

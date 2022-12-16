export function arrayParam<T>(values: T[]) {
  const formatted = JSON.stringify(values).replace(/[\[\]]/g, "");

  return `{${formatted}}`;
}

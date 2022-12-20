export interface PaginationParams {
  after?: string | string[];
  before?: string | string[];
}

export function valueOrLast(value: string | string[]): string;
export function valueOrLast(value?: string | string[]): string | undefined;
export function valueOrLast(value?: string | string[]) {
  if (!value) return;
  if (Array.isArray(value)) return value[value.length - 1];

  return value;
}

export function paginationOptions(params: PaginationParams) {
  if (!params.after && !params.before) return {};

  const after = params.after && decodeURIComponent(valueOrLast(params.after));
  const before =
    params.before && decodeURIComponent(valueOrLast(params.before));

  return { after, before };
}

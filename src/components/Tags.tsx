import { Stack, Tag } from "@shopify/polaris";

export interface Props {
  tags: string[];
  plain?: boolean;
}

export function Tags({ tags, plain }: Props) {
  return (
    <Stack spacing="extraTight">
      {tags.map((tag) => (
        <Tag key={tag} url={plain ? undefined : `/tags/${tag}`}>
          {tag}
        </Tag>
      ))}
    </Stack>
  );
}

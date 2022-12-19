export interface ExitContent {
  markdown: string;
  tags: string[];
}

export interface Exit extends ExitContent {
  id: string;
  markdown: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

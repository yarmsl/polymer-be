interface ITag extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  projects: TObjectId[];
  name: string;
  slug: string;
  order: number;
}

interface IProject extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  customer: TObjectId;
  title: string;
  slug: string;
  done: string;
  year: number;
  images: string[];
  tags: TObjectId[];
  order: number;
}

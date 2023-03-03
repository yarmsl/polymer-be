interface IArticle extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  title: string;
  content: string;
  images: string[];
}

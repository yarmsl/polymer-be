interface IProductionArticle extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  steps: TObjectId[];
  order: number;
  title: string;
  content: string;
}

interface IStep extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  order: number;
  title: string;
  content: string;
  productionArticle: TObjectId;
  image: string;
}

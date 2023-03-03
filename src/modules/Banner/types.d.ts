interface IBanner extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  text: string;
  image: string;
  order: number;
}

interface IBottomBanner extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  projects: string[];
}

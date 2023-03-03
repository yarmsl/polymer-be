interface IMainPicture extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  src: string;
  order: number;
}

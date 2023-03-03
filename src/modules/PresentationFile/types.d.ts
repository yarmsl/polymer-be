interface IPresentationFile extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  file: string;
}

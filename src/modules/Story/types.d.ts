interface IStory extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  from: number;
  to: number;
  content: string;
}

interface IVacancy extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  title: string;
  requirements: string;
  wage: number;
}

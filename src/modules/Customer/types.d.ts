interface ICustomer extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  author: TObjectId;
  projects: TObjectId[];
  name: string;
  slug: string;
  logo: string;
  description: string;
  order: number;
}

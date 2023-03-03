declare interface IUser extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  name: string;
  posts: TObjectId[];
  role: RoleTypes;
  customers: TObjectId[];
  tags: TObjectId[];
  projects: TObjectId[];
  articles: TObjectId[];
  productions: TObjectId[];
  productionArticles: TObjectId[];
  steps: TObjectId[];
  stories: TObjectId[];
  storyArticles: TObjectId[];
  vacancies: TObjectId[];
  presentationFile: TObjectId;
  mainPictures: TObjectId[];
}

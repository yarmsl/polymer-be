interface IMail extends TDocument {
  createdAt: Date;
  updatedAt: Date;
  provider: 'Yandex' | 'Yahoo' | 'Mail.ru';
  feedback: string;
  email: string;
  pass: string;
}

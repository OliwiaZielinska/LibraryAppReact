export class BookResponseDto {
  id: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  isAvailable: boolean | undefined;
}

export class CreateBookDto {
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: string | undefined;
  availabledCopies: string | undefined;
}

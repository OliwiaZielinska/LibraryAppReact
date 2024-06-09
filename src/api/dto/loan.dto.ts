export class LoanResponseDto {
  id: number | undefined;
  loanDate: string | undefined;
  dueDate: string | undefined;
  user: number | undefined;
  book: number | undefined;
  returnDate: string | undefined;
}

export class CreateLoanDto {
  dueDate: string | undefined;
  user: number | undefined;
  book: number | undefined;
}

export interface BookFilterRequest {
  name: string | null;
  authors: string[] | null;
  genders: string[] | null;
  pageSize: number | null;
  pageNumber: number | null;
}

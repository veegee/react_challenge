import Link from "next/link";

export interface PaginationBarProps {
  currentPage: number,
  totalPages: number,
  searchString: string,
}

export const PaginationBar = ({currentPage, totalPages, searchString}: PaginationBarProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  var additionalParams = '';
  const searchParams = new URLSearchParams();
  if (searchString.length > 0) {
    searchParams.append('q', searchString);
    additionalParams = '&' + searchParams.toString();
  }

  return (
    <div className={'pagination-bar text-center'}>
      <Link href={'/?page=1' + additionalParams} className={'py-1.5 px-3 m-3'}>First</Link>
      {currentPage > 1 ? <Link href={`/?page=${prevPage}` + additionalParams} className={'py-1.5 px-3 m-3'}>Prev</Link> : ''}
      <span className={'py-1.5 px-3 m-3'}>{currentPage}</span>
      {currentPage < totalPages ? <Link href={`/?page=${nextPage}` + additionalParams} className={'py-1.5 px-3 m-3'}>Next</Link> : ''}
      <Link href={`/?page=${totalPages}` + additionalParams} className={'py-1.5 px-3 m-3'}>Last</Link>
    </div>
  );
};

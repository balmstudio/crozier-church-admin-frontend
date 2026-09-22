import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  showBoundaryControls?: boolean;
}

const Pagination = ({
  page,
  pageCount,
  onPageChange,
  showBoundaryControls = false,
}: PaginationProps) => {
  const pages = Array.from({ length: Math.min(pageCount, 5) }, (_, index) => index + 1);

  return (
    <nav className="flex items-center gap-2" aria-label="Table pagination">
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="outline"
          size="sm"
          className="size-8 rounded-md px-0 font-normal
            data-[active=true]:border-crozier-text-placeholder
            data-[active=true]:text-crozier-text-heading"
          data-active={pageNumber === page}
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="h-8 font-normal"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      {showBoundaryControls && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 font-normal"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        className="h-8 font-normal"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
      {showBoundaryControls && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 font-normal"
          disabled={page === pageCount}
          onClick={() => onPageChange(pageCount)}
        >
          Last
        </Button>
      )}
    </nav>
  );
};

export default Pagination;

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationComponentProps) => {
  {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setCurrentPage(Math.max(currentPage - 1, 1))
              }
              href="#"
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage - 1)}
                href="#"
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive href="#">
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(currentPage + 1)}
                href="#"
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(totalPages)}
                  href="#"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
};

export default PaginationComponent;

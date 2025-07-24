/**
 * Pagination Controls Component - Pixel-perfect match to screenshot
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import type { PaginationState } from '../../types';

interface PaginationControlsProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange
}) => {
  const { currentPage, totalItems, itemsPerPage } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }

  /**
   * Generate page numbers to display - Exact logic from screenshot
   */
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first few, current area, and last few with ellipsis
      if (currentPage <= 4) {
        // Near the beginning
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px', // Tighter spacing to match reference
        padding: '20px 0',
        marginTop: '20px',

        // Mobile responsive
        '@media (max-width: 768px)': {
          gap: '2px',
          padding: '20px 0',
          flexWrap: 'wrap',
        },
      }}
    >
      {/* Left Arrow */}
      <Box
        component="button"
        className="pagination-button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          width: '32px', // Circular like reference
          height: '32px',
          borderRadius: '50% !important', // Force circular with !important
          border: '1px solid #DDDDDD', // Light border
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.3 : 1,
          fontFamily: 'Karbon, sans-serif',
          '&:hover': {
            backgroundColor: currentPage === 1 ? '#FFFFFF' : '#F5F5F5',
            borderColor: currentPage === 1 ? '#DDDDDD' : '#CCCCCC',
          },
          transition: 'none !important',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#999999', lineHeight: 1, fontWeight: 400 }}>‹</Typography>
      </Box>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={`${page}-${index}`}>
          {page === '...' ? (
            <Typography
              sx={{
                fontSize: '14px',
                color: '#666666',
                padding: '0 4px',
                fontFamily: 'Karbon, sans-serif',
                lineHeight: 1,
              }}
            >
              ...
            </Typography>
          ) : (
            <Box
              component="button"
              className="pagination-button"
              onClick={() => onPageChange(page as number)}
              sx={{
                width: '32px', // Circular like reference
                height: '32px',
                borderRadius: '50% !important', // Force circular with !important
                border: page === currentPage ? 'none' : '1px solid #DDDDDD', // Light border
                backgroundColor: page === currentPage ? '#2E3A87' : '#FFFFFF', // Blue active state like design
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: 'Karbon, sans-serif',
                boxShadow: 'none', // No shadow
                '&:hover': {
                  backgroundColor: page === currentPage ? '#2E3A87' : '#F5F5F5',
                  borderColor: page === currentPage ? 'none' : '#CCCCCC',
                },
                transition: 'none !important',
              }}
            >
              <Typography
                sx={{
                  fontSize: '13px', // Clean font size
                  color: page === currentPage ? '#FFFFFF' : '#333333', // Clean contrast
                  fontWeight: page === currentPage ? 500 : 400, // Medium weight for active
                  lineHeight: 1,
                }}
              >
                {page}
              </Typography>
            </Box>
          )}
        </React.Fragment>
      ))}

      {/* Right Arrow */}
      <Box
        component="button"
        className="pagination-button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          width: '32px', // Circular
          height: '32px',
          borderRadius: '50% !important', // Force circular with !important
          border: '1px solid #DDDDDD', // Light border
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.3 : 1,
          fontFamily: 'Karbon, sans-serif',
          '&:hover': {
            backgroundColor: currentPage === totalPages ? '#FFFFFF' : '#F5F5F5',
            borderColor: currentPage === totalPages ? '#DDDDDD' : '#CCCCCC',
          },
          transition: 'none !important',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#999999', lineHeight: 1, fontWeight: 400 }}>›</Typography>
      </Box>
    </Box>
  );
};
/**
 * Icon Components - SVG icon components using the provided assets
 */
import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Search Icon Component
 */
export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/**
 * Filter Icon Component
 */
export const FilterIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

/**
 * Reset Icon Component
 */
export const ResetIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23,4 23,10 17,10" />
    <polyline points="1,20 1,14 7,14" />
    <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4a9,9,0,0,1-14.85,4.36L23,14" />
  </svg>
);

/**
 * Completed Icon Component
 */
export const CompletedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="9,12 12,15 16,10" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);

/**
 * Pending Icon Component
 */
export const PendingIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

/**
 * User Icon Component
 */
export const UserIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20,21v-2a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * Close Icon Component
 */
export const CloseIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Dropdown Arrow Icon Component
 */
export const DropdownIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

/**
 * Pagination Icon Component
 */
export const PaginationIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/**
 * Title Icon Component
 */
export const TitleIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4,7 4,4 20,4 20,7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

/**
 * Logo Component - Using the Aalto IT logo from assets
 */
export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => {
  return (
    <img
      src="/src/assets/aalto_it.png"
      alt="Aalto IT Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};
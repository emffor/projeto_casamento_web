import * as React from 'react';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import Iconify from 'src/components/iconify';
import { StyledNavItem } from './styles';
import { NavItemProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, open, active, subItem, isExternalLink, ...other }, ref) => {
    const { title, path, children } = item;

    const handleAnchorClick = (event: React.MouseEvent) => {
      event.preventDefault();
      if (path.startsWith('#')) {
        const sectionId = path.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableRipple
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {title}
        {!!children && <Iconify width={16} icon="carbon:chevron-down" sx={{ ml: 1 }} />}
      </StyledNavItem>
    );

    // Âncora
    if (path.startsWith('#')) {
      return (
        <Link href={path} color="inherit" underline="none" onClick={handleAnchorClick}>
          {renderContent}
        </Link>
      );
    }

    // ExternalLink
    if (isExternalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" color="inherit" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={RouterLink} to={path} color="inherit" underline="none">
        {renderContent}
      </Link>
    );
  }
);

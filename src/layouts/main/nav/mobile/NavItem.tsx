import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import { Link, ListItemText, ListItemIcon } from '@mui/material';
import Iconify from 'src/components/iconify';
import { StyledNavItem } from './styles';
import { NavItemProps } from '../types';

// ----------------------------------------------------------------------

export default function NavItem({ item, open, active, isExternalLink, ...other }: NavItemProps) {
  const { title, path, icon, children } = item;

  const handleAnchorClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (path.startsWith('#')) {
      const sectionId = path.substring(1);
      const element = document.getElementById(sectionId);

      if (element) {
        const headerHeight = 64;
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
    <StyledNavItem active={active} {...other}>
      <ListItemIcon> {icon} </ListItemIcon>
      <ListItemText disableTypography primary={title} />
      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 1 }}
        />
      )}
    </StyledNavItem>
  );

  // Âncora
  if (path.startsWith('#')) {
    return (
      <Link href={path} underline="none" onClick={handleAnchorClick}>
        {renderContent}
      </Link>
    );
  }

  // ExternalLink
  if (isExternalLink) {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
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
    <Link component={RouterLink} to={path} underline="none">
      {renderContent}
    </Link>
  );
}

import React from 'react';
import type { HeaderTitleProps } from "../../../types/interfaces/layout/IHeader";
import '../../style/header.css';
import MainHeaderSection from './mainHeaderSection';
import HeaderTitle from './headerTitle';

// Extended HeaderProps interface
interface HeaderProps extends HeaderTitleProps {
  onAdvancedButtonClick?: () => void;
}

export default function Header({ 
  title, 
  subtitle, 
  className = "",
  onAdvancedButtonClick 
}: HeaderProps) {
    return (
        <div className={`${className}`}>
            <HeaderTitle title={title} subtitle={subtitle} className='title_header' />
            <MainHeaderSection 
              title={title} 
              subtitle={subtitle} 
              className='main_header_section' 
              onAdvancedButtonClick={onAdvancedButtonClick}
            />
        </div>
    );
}
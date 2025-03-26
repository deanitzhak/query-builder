import React from 'react'; // Fix import
import type { HeaderTitleProps } from "../../../types/interfaces/layout/IHeader";
import '../../style/header.css';
import MainHeaderSection from './mainHeaderSection';
import HeaderTitle from './headerTitle';


// fetch the class name how can be each entety
export default function Header({ title, subtitle, className = "" }: HeaderTitleProps) {
    return (
        <div className={`${className}`}>
            <HeaderTitle title={title} subtitle={subtitle} className='title_header' />
            <MainHeaderSection title={title} subtitle={subtitle} className='main_header_section' />
        </div>
    );
}
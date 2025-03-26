import React from "react";
import type { HeaderTitleProps } from "../../../types/interfaces/layout/IHeader";
import { headerTitleVariants, headerTitleTextVariants } from "../../variants/titles/headerTitleVariants";
import '../../style/header.css';

export default function HeaderTitle({ title, subtitle, className = "", size = "large" }: HeaderTitleProps) {
  return (
      <div className={`${headerTitleVariants({ size })} ${className}`}>
          <h1 className={headerTitleTextVariants()}>
              {title}
          </h1>
          {subtitle && <p>{subtitle}</p>}
      </div>
  );
}
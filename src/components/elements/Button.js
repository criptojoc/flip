import React from 'react';
import {ReactComponent as ArrowIcon} from "assets/icons/arrow.svg";

export default ({ text, href, children, target = '_self', isArrow = true }) => (
  <a href={href} className="btn__default" target={target}>
    {text}
    {children}
    {isArrow && <ArrowIcon />}
  </a>
)

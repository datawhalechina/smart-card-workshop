import React from 'react';
import { RenderLeafProps } from 'slate-react';

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  let element = <>{children}</>;

  if (leaf.bold) {
    element = <strong>{element}</strong>;
  }

  if (leaf.code) {
    element = <code>{element}</code>;
  }

  if (leaf.italic) {
    element = <em>{element}</em>;
  }

  if (leaf.underline) {
    element = <u>{element}</u>;
  }

  const style: React.CSSProperties = {};
  
  if (leaf.color) {
    style.color = leaf.color;
  }
  
  if (leaf.fontSize) {
    style.fontSize = leaf.fontSize;
  }

  if (leaf.backgroundColor) {
    style.backgroundColor = leaf.backgroundColor;
  }

  return (
    <span {...attributes} style={style}>
      {element}
    </span>
  );
}; 
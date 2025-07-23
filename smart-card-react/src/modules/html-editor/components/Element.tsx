import React from 'react';
import { RenderElementProps } from 'slate-react';

interface ImageElement {
  type: 'image';
  url: string;
  children: { text: string }[];
}

export const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  const style = element.align ? { textAlign: element.align as React.CSSProperties['textAlign'] } : {};

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      const imageElement = element as ImageElement;
      return (
        <div {...attributes}>
          <div contentEditable={false} style={{ position: 'relative' }}>
            <img 
              src={imageElement.url} 
              alt="插入的图片" 
              style={{ 
                display: 'block', 
                maxWidth: '100%', 
                maxHeight: '20em',
                boxSizing: 'border-box'
              }} 
            />
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}; 
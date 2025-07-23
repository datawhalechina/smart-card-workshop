import React, { PropsWithChildren } from 'react';

interface ToolbarButtonProps {
  active?: boolean;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}

export const ToolbarButton: React.FC<PropsWithChildren<ToolbarButtonProps>> = ({
  active,
  onMouseDown,
  title,
  children,
}) => {
  return (
    <button
      onMouseDown={onMouseDown}
      title={title}
      className={`toolbar-button ${active ? 'active' : ''}`}
      style={{
        color: active ? '#fff' : '#aaa',
        background: 'transparent',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}; 
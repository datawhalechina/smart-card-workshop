import React, { useEffect, useRef } from 'react';
import { Editor, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { Portal } from './Portal';
import { ToolbarButton } from './ToolbarButton';
import { toggleMark, isMarkActive } from '../utils/editor';

export const HoveringToolbar: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) return;
    
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <div
        ref={ref}
        className="hovering-toolbar"
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '-10000px',
          left: '-10000px',
          marginTop: '-6px',
          opacity: 0,
          backgroundColor: '#222',
          borderRadius: '4px',
          transition: 'opacity 0.75s',
          padding: '8px',
          display: 'flex',
          gap: '8px',
        }}
        onMouseDown={(e) => {
          // 防止工具栏点击时编辑区域失去焦点
          e.preventDefault();
        }}
      >
        <ToolbarButton
          active={isMarkActive(editor, 'bold')}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggleMark(editor, 'bold');
          }}
        >
          <span style={{ fontWeight: 'bold' }}>B</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'italic')}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggleMark(editor, 'italic');
          }}
        >
          <span style={{ fontStyle: 'italic' }}>I</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'underline')}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggleMark(editor, 'underline');
          }}
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'code')}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggleMark(editor, 'code');
          }}
        >
          <span style={{ fontFamily: 'monospace' }}>{`< >`}</span>
        </ToolbarButton>
      </div>
    </Portal>
  );
}; 
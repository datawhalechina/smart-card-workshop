import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { ToolbarButton } from './ToolbarButton';
import { toggleMark, toggleBlock, setMark, isMarkActive, isBlockActive, setTextAlign, insertImage } from '../utils/editor';

// 预定义的颜色列表
const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
];

export const Toolbar: React.FC = () => {
  const editor = useSlate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);

  const fontSizes = [
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
    { label: '28px', value: '28px' },
    { label: '32px', value: '32px' },
    { label: '36px', value: '36px' },
  ];

  // 处理图片上传
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;
      
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          insertImage(editor, reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="toolbar" style={{
      display: 'flex',
      flexWrap: 'wrap',
      padding: '8px',
      marginBottom: '8px',
      borderBottom: '1px solid #ddd',
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 1,
      gap: '8px'
    }}>
      {/* 文本样式 */}
      <div style={{ display: 'flex', gap: '4px', marginRight: '12px' }}>
        <ToolbarButton
          active={isMarkActive(editor, 'bold')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, 'bold');
          }}
          title="加粗"
        >
          <span style={{ fontWeight: 'bold' }}>B</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'italic')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, 'italic');
          }}
          title="斜体"
        >
          <span style={{ fontStyle: 'italic' }}>I</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'underline')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, 'underline');
          }}
          title="下划线"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </ToolbarButton>
        <ToolbarButton
          active={isMarkActive(editor, 'code')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, 'code');
          }}
          title="代码"
        >
          <span style={{ fontFamily: 'monospace' }}>{`< >`}</span>
        </ToolbarButton>
      </div>

      {/* 块级元素 */}
      <div style={{ display: 'flex', gap: '4px', marginRight: '12px' }}>
        <ToolbarButton
          active={isBlockActive(editor, 'heading-one')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, 'heading-one');
          }}
          title="一级标题"
        >
          <span style={{ fontWeight: 'bold' }}>H1</span>
        </ToolbarButton>
        <ToolbarButton
          active={isBlockActive(editor, 'paragraph')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, 'paragraph');
          }}
          title="段落"
        >
          <span>P</span>
        </ToolbarButton>
        <ToolbarButton
          active={isBlockActive(editor, 'numbered-list')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, 'numbered-list');
          }}
          title="有序列表"
        >
          <span>1.</span>
        </ToolbarButton>
        <ToolbarButton
          active={isBlockActive(editor, 'bulleted-list')}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, 'bulleted-list');
          }}
          title="无序列表"
        >
          <span>•</span>
        </ToolbarButton>
      </div>

      {/* 对齐方式 */}
      <div style={{ display: 'flex', gap: '4px', marginRight: '12px' }}>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setTextAlign(editor, 'left');
          }}
          title="左对齐"
        >
          <span>⟵</span>
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setTextAlign(editor, 'center');
          }}
          title="居中"
        >
          <span>⟷</span>
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setTextAlign(editor, 'right');
          }}
          title="右对齐"
        >
          <span>⟶</span>
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setTextAlign(editor, 'justify');
          }}
          title="两端对齐"
        >
          <span>☰</span>
        </ToolbarButton>
      </div>

      {/* 颜色选择 */}
      <div style={{ position: 'relative', marginRight: '12px' }}>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setShowColorPicker(!showColorPicker);
          }}
          title="文字颜色"
        >
          <div style={{
            width: '18px',
            height: '18px',
            backgroundColor: currentColor,
            borderRadius: '2px',
          }} />
        </ToolbarButton>
        {showColorPicker && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 2,
            padding: '8px',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            borderRadius: '4px',
            width: '200px',
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: '4px'
            }}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: '16px',
                    height: '16px',
                    border: color === currentColor ? '2px solid #000' : '1px solid #ddd',
                    cursor: 'pointer',
                    padding: 0,
                    borderRadius: '2px',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setCurrentColor(color);
                    setMark(editor, 'color', color);
                    setShowColorPicker(false);
                  }}
                  title={color}
                />
              ))}
            </div>
            <input 
              type="color"
              value={currentColor}
              onChange={(e) => {
                const newColor = e.target.value;
                setCurrentColor(newColor);
                setMark(editor, 'color', newColor);
              }}
              style={{ 
                width: '100%', 
                marginTop: '8px',
                cursor: 'pointer'
              }}
            />
          </div>
        )}
      </div>

      {/* 字体大小 */}
      <div style={{ position: 'relative', marginRight: '12px' }}>
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            setShowFontSizeMenu(!showFontSizeMenu);
          }}
          title="字体大小"
        >
          <span>字号</span>
        </ToolbarButton>
        {showFontSizeMenu && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 2,
            padding: '8px',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setMark(editor, 'fontSize', size.value);
                  setShowFontSizeMenu(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '4px 8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 插入图片 */}
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault();
          handleImageUpload();
        }}
        title="插入图片"
      >
        <span>🖼️</span>
      </ToolbarButton>
    </div>
  );
}; 
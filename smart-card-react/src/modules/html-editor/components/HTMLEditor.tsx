'use client';

import React, { useState, useRef, useEffect } from 'react';
import './HTMLEditor.css';

interface HTMLEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const HTMLEditor: React.FC<HTMLEditorProps> = ({ initialValue = '', onChange }) => {
  const [html, setHtml] = useState(initialValue);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleChange = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtml(newHtml);
      if (onChange) {
        onChange(newHtml);
      }
    }
  };

  // 简单的格式化按钮功能
  const formatDoc = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleChange();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

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
          formatDoc('insertImage', reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="html-editor">
      <div className="toolbar">
        <div className="toolbar-group">
          <button onClick={() => formatDoc('bold')} title="加粗" className="toolbar-button">
            <span style={{ fontWeight: 'bold' }}>B</span>
          </button>
          <button onClick={() => formatDoc('italic')} title="斜体" className="toolbar-button">
            <span style={{ fontStyle: 'italic' }}>I</span>
          </button>
          <button onClick={() => formatDoc('underline')} title="下划线" className="toolbar-button">
            <span style={{ textDecoration: 'underline' }}>U</span>
          </button>
        </div>

        <div className="toolbar-group">
          <button onClick={() => formatDoc('formatBlock', '<h1>')} title="一级标题" className="toolbar-button">
            <span style={{ fontWeight: 'bold' }}>H1</span>
          </button>
          <button onClick={() => formatDoc('formatBlock', '<p>')} title="段落" className="toolbar-button">
            <span>P</span>
          </button>
        </div>

        <div className="toolbar-group">
          <button onClick={() => formatDoc('justifyLeft')} title="左对齐" className="toolbar-button">
            <span>⟵</span>
          </button>
          <button onClick={() => formatDoc('justifyCenter')} title="居中" className="toolbar-button">
            <span>⟷</span>
          </button>
          <button onClick={() => formatDoc('justifyRight')} title="右对齐" className="toolbar-button">
            <span>⟶</span>
          </button>
        </div>

        <div className="toolbar-group">
          <input 
            type="color" 
            onChange={(e) => formatDoc('foreColor', e.target.value)} 
            title="文字颜色"
            className="color-picker"
          />
          <button onClick={handleImageUpload} title="插入图片" className="toolbar-button">
            <span>🖼️</span>
          </button>
        </div>

        <div className="toolbar-group">
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)} 
            title={isPreviewMode ? "编辑模式" : "预览模式"} 
            className="toolbar-button"
          >
            {isPreviewMode ? "编辑" : "预览"}
          </button>
        </div>
      </div>

      <div className="editor-container">
        {isPreviewMode ? (
          <div className="preview-area" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div
            ref={editorRef}
            className="editable-area"
            contentEditable
            onInput={handleChange}
            onBlur={handleChange}
            spellCheck={false}
          />
        )}
      </div>

      <div className="html-preview">
        <h3>HTML代码</h3>
        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            if (editorRef.current) {
              editorRef.current.innerHTML = e.target.value;
            }
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          className="html-code"
        />
      </div>
    </div>
  );
};

export default HTMLEditor; 
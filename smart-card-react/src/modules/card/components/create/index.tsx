import React, { useState } from 'react';
import HTMLEditor from '@/modules/html-editor';

const HTMLEditorDemo: React.FC = () => {
  const [html, setHtml] = useState<string>('');

  const handleChange = (value: string) => {
    setHtml(value);
    console.log('HTML内容已更新:', value);
  };

  return (
    <div className="html-editor-demo">
      <h2>HTML可视化编辑器</h2>
      <p>这是一个基于Slate.js的可视化HTML编辑器，支持文本格式化、颜色调整和元素尺寸设置。</p>
      
      <div className="editor-container">
        <HTMLEditor onChange={handleChange} />
      </div>
      
      <div className="output-container">
        <h3>输出结果</h3>
        <pre>{html}</pre>
      </div>
      
      <style jsx>{`
        .html-editor-demo {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .editor-container {
          margin: 20px 0;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .output-container {
          margin-top: 30px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .output-container pre {
          white-space: pre-wrap;
          word-break: break-all;
          max-height: 300px;
          overflow: auto;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default HTMLEditorDemo; 
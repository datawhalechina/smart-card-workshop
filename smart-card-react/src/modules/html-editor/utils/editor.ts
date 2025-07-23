import { Editor, Transforms, Element as SlateElement } from 'slate';

// 定义标记类型
export type MarkFormat = 'bold' | 'italic' | 'underline' | 'code' | 'color' | 'fontSize' | 'backgroundColor';

// 定义块级元素类型
export type BlockFormat = 'heading-one' | 'heading-two' | 'paragraph' | 'block-quote' | 'numbered-list' | 'bulleted-list';

// 检查当前选中文本是否有特定标记
export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// 切换文本标记
export const toggleMark = (editor: Editor, format: MarkFormat, value: unknown = true) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value);
  }
};

// 设置文本标记值（如颜色、字体大小等）
export const setMark = (editor: Editor, format: MarkFormat, value: unknown) => {
  Editor.addMark(editor, format, value);
};

// 检查当前块级元素是否是特定类型
export const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => {
      if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
        return (n as { type: string }).type === format;
      }
      return false;
    },
  });

  return !!match;
};

// 切换块级元素类型
export const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === 'numbered-list' || format === 'bulleted-list';

  Transforms.unwrapNodes(editor, {
    match: n => {
      if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
        const nodeType = (n as { type: string }).type;
        return ['numbered-list', 'bulleted-list'].includes(nodeType);
      }
      return false;
    },
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// 插入图片
export const insertImage = (editor: Editor, url: string) => {
  const image = { type: 'image', url, children: [{ text: '' }] };
  Transforms.insertNodes(editor, image);
};

// 设置文本对齐方式
export const setTextAlign = (editor: Editor, align: string) => {
  Transforms.setNodes(
    editor,
    { align },
    { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
  );
};

interface SlateNode {
  type?: string;
  children?: SlateNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
  fontSize?: string;
}

// 将HTML转换为Slate文档
export const htmlToSlate = (html: string): SlateNode[] => {
  // 这里需要一个完整的HTML转Slate的实现
  // 这只是一个简单的示例
  const div = document.createElement('div');
  div.innerHTML = html;
  
  // 简单实现，实际项目中需要更复杂的转换逻辑
  const paragraphs = Array.from(div.querySelectorAll('p'));
  return paragraphs.map(p => ({
    type: 'paragraph',
    children: [{ text: p.textContent || '' }]
  }));
};

// 将Slate文档转换为HTML
export const slateToHtml = (value: SlateNode[]): string => {
  // 这里需要一个完整的Slate转HTML的实现
  // 这只是一个简单的示例
  return value.map(node => {
    if (node.type === 'paragraph' && node.children) {
      const textContent = node.children.map((child) => {
        let text = child.text || '';
        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        if (child.underline) text = `<u>${text}</u>`;
        if (child.code) text = `<code>${text}</code>`;
        if (child.color) text = `<span style="color:${child.color}">${text}</span>`;
        if (child.fontSize) text = `<span style="font-size:${child.fontSize}">${text}</span>`;
        return text;
      }).join('');
      return `<p>${textContent}</p>`;
    }
    return '';
  }).join('');
}; 
/**
 * html2image.js - 将HTML元素导出为图片
 * 
 * 这个脚本提供了将HTML元素转换为图片并下载的功能
 * 使用html2canvas库实现
 */

// 将指定元素导出为图片并下载
function exportAsImage(elementId, filename = 'exported-image.png') {
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`Element with ID "${elementId}" not found`);
        return;
    }
    
    // 使用html2canvas捕获元素
    html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // 提高分辨率
        backgroundColor: null, // 保持背景透明
        logging: false
    }).then(canvas => {
        // 转换为数据URL
        const imageData = canvas.toDataURL('image/png');
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = filename;
        link.href = imageData;
        
        // 模拟点击下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error('导出图片时出错:', error);
    });
}

// 添加导出按钮到页面
function addExportButton(targetElementId, buttonText = '导出为图片') {
    const targetElement = document.getElementById(targetElementId);
    
    if (!targetElement) {
        console.error(`Target element with ID "${targetElementId}" not found`);
        return;
    }
    
    // 创建按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .export-image-btn {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 10px 2px;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: background-color 0.3s;
        }
        .export-image-btn:hover {
            background-color: #45a049;
        }
    `;
    document.head.appendChild(style);
    
    // 创建按钮
    const button = document.createElement('button');
    button.classList.add('export-image-btn');
    button.textContent = buttonText;
    button.onclick = () => exportAsImage(targetElementId);
    
    // 如果目标元素是卡片本身，创建一个容器来包含卡片和按钮
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '15px';
    
    // 将目标元素替换为容器
    targetElement.parentNode.insertBefore(container, targetElement);
    container.appendChild(targetElement);
    container.appendChild(button);
}

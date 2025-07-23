'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card as CardType, ImageExportOptions } from '@/modules/card/types';
import { Button, Badge, Card as UICard } from '@/components/ui';
import { Edit, Download, Trash2, Eye, Share2 } from 'lucide-react';
import { useCardStore } from '@/modules/card/store';
import { useToastStore } from '@/modules/common/store/toastStore';

interface CardPreviewProps {
  card: CardType;
  onEdit?: (card: CardType) => void;
  onDelete?: (cardId: string) => void;
  onExport?: (card: CardType, options: ImageExportOptions) => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  onEdit,
  onDelete,
  onExport,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { deleteCard } = useCardStore();
  const { addToast } = useToastStore();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(card);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除这张卡片吗？')) {
      const success = await deleteCard(card.id);
      if (success) {
        addToast({
          title: '删除成功',
          description: '卡片已被删除',
          type: 'success',
        });
        if (onDelete) {
          onDelete(card.id);
        }
      } else {
        addToast({
          title: '删除失败',
          description: '无法删除卡片，请稍后重试',
          type: 'error',
        });
      }
    }
  };

  const handleExport = async (format: 'png' | 'jpg' | 'pdf') => {
    setIsExporting(true);
    try {
      const exportOptions: ImageExportOptions = {
        format,
        quality: 90,
        width: 800,
        height: 600,
        scale: 2,
      };

      if (onExport) {
        await onExport(card, exportOptions);
        addToast({
          title: '导出成功',
          description: `卡片已导出为 ${format.toUpperCase()} 格式`,
          type: 'success',
        });
      }
    } catch {
      addToast({
        title: '导出失败',
        description: '导出过程中发生错误，请稍后重试',
        type: 'error',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: card.content,
          url: window.location.href,
        });
      } else {
        // 备用方案：复制到剪贴板
        await navigator.clipboard.writeText(window.location.href);
        addToast({
          title: '链接已复制',
          description: '卡片链接已复制到剪贴板',
          type: 'success',
        });
      }
    } catch {
      addToast({
        title: '分享失败',
        description: '无法分享卡片，请稍后重试',
        type: 'error',
      });
    }
  };

  return (
    <>
      <UICard className="hover:shadow-md transition-shadow">
        <div className="flex flex-col h-full">
          {/* 卡片预览 */}
          <div className="flex-1 mb-4">
            <div
              className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative"
              onClick={() => setIsPreviewOpen(true)}
            >
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full p-4 text-sm overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: card.htmlContent }}
                />
              )}
            </div>
          </div>

          {/* 卡片信息 */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {card.content}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* 元数据 */}
            <div className="text-xs text-gray-500 mb-4">
              <div>创建时间: {new Date(card.createdAt).toLocaleDateString()}</div>
              {card.author && <div>作者: {card.author}</div>}
              {card.category && <div>分类: {card.category}</div>}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                icon={Eye}
                onClick={() => setIsPreviewOpen(true)}
              >
                预览
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Edit}
                onClick={handleEdit}
              >
                编辑
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                icon={Share2}
                onClick={handleShare}
              >
                分享
              </Button>
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Download}
                  loading={isExporting}
                  onClick={() => handleExport('png')}
                >
                  导出
                </Button>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  <button
                    className="block w-full px-3 py-1 text-left text-sm hover:bg-gray-100"
                    onClick={() => handleExport('png')}
                  >
                    PNG
                  </button>
                  <button
                    className="block w-full px-3 py-1 text-left text-sm hover:bg-gray-100"
                    onClick={() => handleExport('jpg')}
                  >
                    JPG
                  </button>
                  <button
                    className="block w-full px-3 py-1 text-left text-sm hover:bg-gray-100"
                    onClick={() => handleExport('pdf')}
                  >
                    PDF
                  </button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      </UICard>

      {/* 预览模态框 */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: card.htmlContent }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardPreview; 
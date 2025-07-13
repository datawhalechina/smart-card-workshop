import React from 'react';
import Image from 'next/image';
import { ShowcaseCard as ShowcaseCardType } from '@/types';
import { Eye, Heart, GitFork, User } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

interface ShowcaseCardProps {
  card: ShowcaseCardType;
}

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

/**
 * ShowcaseCard component to display a single card in the showcase grid.
 * @param {ShowcaseCardProps} props The props for the component.
 * @returns {React.ReactElement} The rendered showcase card.
 */
const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ card }) => {
  return (
    <Card className="overflow-hidden group cursor-pointer flex flex-col">
      <div className="relative w-full aspect-[3/5]">
        <Image
          src={card.thumbnailUrl}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{card.category}</Badge>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2 truncate">{card.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <User className="w-4 h-4 mr-2" />
          <span>{card.author || '匿名作者'}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {formatNumber(card.views)}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" /> {formatNumber(card.likes)}
            </span>
            <span className="flex items-center">
              <GitFork className="w-4 h-4 mr-1" /> {formatNumber(card.forks)}
            </span>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
            复刻
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ShowcaseCard; 
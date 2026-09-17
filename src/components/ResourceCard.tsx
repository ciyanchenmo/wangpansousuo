import React, { useState } from 'react';
import { 
  Copy, 
  ExternalLink, 
  Check, 
  ShieldCheck, 
  Download, 
  Clock, 
  HardDrive, 
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { ResourceItem, AffiliateConfig } from '../types';
import { washPanLink, getPanBadgeColor, getPanDisplayName } from '../utils/affiliate';

interface ResourceCardProps {
  resource: ResourceItem;
  affiliateConfig: AffiliateConfig;
  onSelect: (resource: ResourceItem) => void;
  onOpenAffiliateModal: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  affiliateConfig,
  onSelect,
  onOpenAffiliateModal,
}) => {
  const [copied, setCopied] = useState(false);

  // 计算洗链后的推广URL及分成参数
  const washResult = washPanLink(
    resource.originalUrl,
    resource.panType,
    affiliateConfig
  );

  const badgeColor = getPanBadgeColor(resource.panType);
  const panDisplayName = getPanDisplayName(resource.panType);

  const handleCopyWashedLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `【${resource.title}】\n网盘类型: ${panDisplayName} (${resource.resolution})\n文件大小: ${resource.size}\n资源链接: ${washResult.washedUrl}${resource.extractCode ? `\n提取码: ${resource.extractCode}` : ''}\n(支持在线极速播放与不限速转存)`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(washResult.washedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(resource)}
      id={`resource-card-${resource.id}`}
      className="group relative bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Top Banner & Poster Section */}
      <div className="relative">
        <div className="h-44 w-full overflow-hidden bg-zinc-100 relative">
          <img
            src={resource.poster}
            alt={resource.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Pan Type Badge Top Left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-xs backdrop-blur-md bg-white/95 ${badgeColor.text} border ${badgeColor.border} flex items-center gap-1`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badgeColor.iconBg}`} />
              {panDisplayName}
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
              {resource.resolution}
            </span>
          </div>

          {/* Rating or views top right */}
          {resource.rating && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-xs">
              ★ {resource.rating.toFixed(1)}
            </div>
          )}

          {/* Bottom Overlay on Poster */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-zinc-200 font-medium">
              <HardDrive className="w-3.5 h-3.5 text-zinc-300" />
              {resource.size}
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Clock className="w-3 h-3" />
              {resource.updateTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
            {resource.title}
          </h3>

          {/* Episode or Short Info */}
          {resource.episodes && (
            <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
              {resource.episodes}
            </p>
          )}

          {/* Tags */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Affiliate Earning Tag & Action Area */}
        <div className="mt-4 pt-3 border-t border-zinc-100">
          
          {/* Wash Status Indicator */}
          <div className="mb-2.5 flex items-center justify-between text-xs">
            {washResult.isWashed ? (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAffiliateModal();
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
                title="已自动注入您的达人推广UID，点击可管理推广参数"
              >
                <DollarSign className="w-3 h-3 text-emerald-600" />
                <span>已挂专属推广 (UID:{washResult.uidUsed.slice(0, 6)}*)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                <span>未挂推广UID</span>
              </div>
            )}

            {resource.extractCode && (
              <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                码:{resource.extractCode}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyWashedLink}
              id={`btn-copy-card-${resource.id}`}
              className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 transition-all cursor-pointer"
              title="复制含推广参数的文案"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>复制推广文案</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenDirect}
              id={`btn-open-card-${resource.id}`}
              className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-xs shadow-rose-600/20"
              title="直达网盘转存页"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>转存 / 查看</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

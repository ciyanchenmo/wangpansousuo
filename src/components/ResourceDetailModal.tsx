import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  FolderTree, 
  FileText, 
  DollarSign, 
  Zap,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ResourceItem, AffiliateConfig } from '../types';
import { washPanLink, getPanBadgeColor, getPanDisplayName } from '../utils/affiliate';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  affiliateConfig: AffiliateConfig;
  onClose: () => void;
  onOpenAffiliateModal: () => void;
  onOpenGuideModal: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  affiliateConfig,
  onClose,
  onOpenAffiliateModal,
  onOpenGuideModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedShareText, setCopiedShareText] = useState(false);

  if (!resource) return null;

  const washResult = washPanLink(
    resource.originalUrl,
    resource.panType,
    affiliateConfig
  );

  const badgeColor = getPanBadgeColor(resource.panType);
  const panDisplayName = getPanDisplayName(resource.panType);

  const fullShareText = `【资源推荐】${resource.title}
▸ 网盘渠道: ${panDisplayName} (${resource.resolution})
▸ 文件体积: ${resource.size}
▸ 提取状态: 官方高速通道 / 支持手机电脑在线直投
▸ 专属分享链接: ${washResult.washedUrl}${resource.extractCode ? `\n▸ 提取码: ${resource.extractCode}` : ''}
(提示: 请在网盘App内打开一键转存，保存到自己的网盘永久有效)`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(washResult.washedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(fullShareText);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="relative h-48 sm:h-56 bg-zinc-900 overflow-hidden">
          <img
            src={resource.poster}
            alt={resource.title}
            className="w-full h-full object-cover opacity-40 blur-xs scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold bg-white ${badgeColor.text}`}>
                {panDisplayName}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/20 text-white backdrop-blur-md">
                {resource.resolution}
              </span>
              {resource.rating && (
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500 text-white">
                  ★ {resource.rating.toFixed(1)} 豆瓣评分
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {resource.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Key Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
              <div className="text-xs text-zinc-500">文件大小</div>
              <div className="text-sm font-bold text-zinc-900 mt-0.5">{resource.size}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
              <div className="text-xs text-zinc-500">更新时间</div>
              <div className="text-sm font-bold text-zinc-900 mt-0.5">{resource.updateTime}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
              <div className="text-xs text-zinc-500">集数/版本</div>
              <div className="text-sm font-bold text-zinc-900 mt-0.5 truncate">{resource.episodes || '完整版'}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
              <div className="text-xs text-zinc-500">提取码</div>
              <div className="text-sm font-bold text-zinc-900 mt-0.5 font-mono">
                {resource.extractCode ? resource.extractCode : '无需提取码 (公开)'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              资源简介
            </h4>
            <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/60">
              {resource.description}
            </p>
          </div>

          {/* Files Summary Tree */}
          {resource.filesSummary && resource.filesSummary.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FolderTree className="w-4 h-4 text-zinc-500" />
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  包含文件列表 (已自动索引目录)
                </h4>
              </div>
              <div className="bg-zinc-900 text-zinc-300 p-3.5 rounded-xl font-mono text-xs space-y-1.5 border border-zinc-800">
                {resource.filesSummary.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
                    <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monetization / Affiliate Link Status Box */}
          <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-emerald-50 border-2 border-emerald-300/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 uppercase">
                    推广挂链已就绪 · 变现收益归属站长
                  </span>
                  <p className="text-[11px] text-emerald-700">
                    当前分享出链已自动绑定您的达人 UID: <code className="font-mono font-bold bg-emerald-100 px-1 rounded">{washResult.uidUsed || '默认'}</code>
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAffiliateModal}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
              >
                配置我的UID
              </button>
            </div>

            {/* Step Pipeline Visualization */}
            <div className="my-3 py-2 px-3 bg-white/80 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between flex-wrap gap-1">
              <span className="font-medium text-zinc-600">全网爬取他人公开源</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              <span className="font-medium text-emerald-700">自动转存至达人网盘</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              <span className="font-semibold text-emerald-900">生成带UID专属出链</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
              <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                用户拉新/SVIP获得佣金
              </span>
            </div>

            {/* Commission Breakdown Pills */}
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <span className="text-[11px] text-emerald-800 font-semibold">此链接可触发收益:</span>
              {washResult.commissionTypes.map((comm, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100/90 text-emerald-800 border border-emerald-200">
                  {comm}
                </span>
              ))}
            </div>

            {/* Generated Washed URL Display */}
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={washResult.washedUrl}
                className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-2 text-xs font-mono text-zinc-800 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="shrink-0 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '已复制' : '复制链接'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>支持手机App唤醒转存，新客首次安装登录最高返 10 元/人</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyShareText}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedShareText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedShareText ? '文案已复制' : '复制推广文案(发微信/群)'}</span>
            </button>

            <a
              href={washResult.washedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>立即去网盘转存</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  RefreshCw 
} from 'lucide-react';
import { PanType, AffiliateConfig } from '../types';
import { washPanLink, getPanDisplayName } from '../utils/affiliate';

interface QuickWashModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliateConfig: AffiliateConfig;
}

export const QuickWashModal: React.FC<QuickWashModalProps> = ({
  isOpen,
  onClose,
  affiliateConfig,
}) => {
  const [inputUrl, setInputUrl] = useState('https://pan.quark.cn/s/3b99ac10482');
  const [selectedPan, setSelectedPan] = useState<PanType>('quark');
  const [isWashing, setIsWashing] = useState(false);
  const [washResult, setWashResult] = useState<{
    washedUrl: string;
    uidUsed: string;
    commissionTypes: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleExecuteWash = () => {
    if (!inputUrl.trim()) return;
    setIsWashing(true);
    setWashResult(null);

    // 模拟洗链转存管道延迟
    setTimeout(() => {
      const res = washPanLink(inputUrl, selectedPan, affiliateConfig);
      setWashResult({
        washedUrl: res.washedUrl,
        uidUsed: res.uidUsed,
        commissionTypes: res.commissionTypes,
      });
      setIsWashing(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!washResult) return;
    navigator.clipboard.writeText(washResult.washedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">单链接快速洗链转换工具</h2>
              <p className="text-xs text-zinc-400">
                将他人的任意公开网盘链接，一键洗成带您UID的专属推广分享链接
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Pan selector */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              目标网盘平台
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
              {(['quark', 'uc', 'baidu', 'aliyun', 'xunlei'] as PanType[]).map((pan) => (
                <button
                  key={pan}
                  type="button"
                  onClick={() => setSelectedPan(pan)}
                  className={`py-2 px-2.5 rounded-xl font-semibold border text-center transition-colors cursor-pointer ${
                    selectedPan === pan
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {getPanDisplayName(pan)}
                </button>
              ))}
            </div>
          </div>

          {/* Input URL */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              粘贴他人的公开分享链接 (原始源)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="例如: https://pan.quark.cn/s/3b99ac10482"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
              />
              <button
                onClick={handleExecuteWash}
                disabled={isWashing}
                className="shrink-0 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isWashing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>洗链中...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>一键洗链</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Wash Result Box */}
          {washResult ? (
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  洗链完成！已成功注入达人推广UID
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded">
                  UID: {washResult.uidUsed}
                </span>
              </div>

              {/* URL */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={washResult.washedUrl}
                  className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="shrink-0 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已复制' : '复制专属链'}</span>
                </button>
                <a
                  href={washResult.washedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                  title="在新标签页测试访问"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Commission Badges */}
              <div className="pt-2 border-t border-emerald-200 text-xs text-emerald-900">
                <span className="font-semibold mr-2">包含变现权益:</span>
                {washResult.commissionTypes.map((comm, idx) => (
                  <span key={idx} className="mr-2 inline-block font-medium bg-white/80 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                    ✓ {comm}
                  </span>
                ))}
              </div>

              {/* Auto Cleanup Notice */}
              <div className="text-[11px] text-emerald-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>后台守护进程已设置: 30分钟后将自动删除转存临时文件，零占用网盘空间</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 space-y-1">
              <div className="font-semibold text-zinc-700">洗链工作流说明:</div>
              <p>1. 输入任意他人分享的网盘资源链接</p>
              <p>2. 系统调用转存与重分享接口，生成归属于您UID的新链接</p>
              <p>3. 任何用户通过此新链接下载、转存或购买SVIP，平台都会将佣金结算给您</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
          >
            关闭
          </button>
        </div>

      </div>
    </div>
  );
};

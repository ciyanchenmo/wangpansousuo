import React, { useState } from 'react';
import { 
  Search, 
  Share2, 
  BookOpen, 
  Zap, 
  DollarSign, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { AffiliateConfig } from '../types';

interface NavbarProps {
  affiliateConfig: AffiliateConfig;
  onOpenAffiliateModal: () => void;
  onOpenGuideModal: () => void;
  onOpenQuickWashModal: () => void;
  onOpenRevenueModal: () => void;
  totalResourcesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  affiliateConfig,
  onOpenAffiliateModal,
  onOpenGuideModal,
  onOpenQuickWashModal,
  onOpenRevenueModal,
  totalResourcesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-zinc-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Pan<span className="text-rose-600">Search</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
                  网盘聚合引擎
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 hidden md:block">
                全网影视/资料搜索 · 自动化推广洗链
              </p>
            </div>
          </div>

          {/* Center / Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* Guide Button - Directly answers the prompt */}
            <button
              onClick={onOpenGuideModal}
              id="btn-open-affiliate-guide"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span>怎么挂推广链接？</span>
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded text-[10px] font-bold">新手必看</span>
            </button>

            {/* Quick Wash Link Tool */}
            <button
              onClick={onOpenQuickWashModal}
              id="btn-open-quick-wash"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>单链洗链工具</span>
            </button>

            {/* Revenue Simulator */}
            <button
              onClick={onOpenRevenueModal}
              id="btn-open-revenue-calc"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>收益测算</span>
            </button>

            {/* Affiliate Config Button with Status Pill */}
            <button
              onClick={onOpenAffiliateModal}
              id="btn-open-affiliate-config"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 transition-all cursor-pointer"
            >
              <div className="relative flex items-center">
                <span className={`w-2 h-2 rounded-full ${affiliateConfig.autoWashEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`}></span>
              </div>
              <span>推广达人配置</span>
              <span className="text-xs text-zinc-500 font-mono">
                {affiliateConfig.quarkUid ? affiliateConfig.quarkUid.slice(0, 8) : '未绑定'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenGuideModal}
              className="px-2.5 py-1.5 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-md"
            >
              挂链教程
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
              aria-label="菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-zinc-200 space-y-2 animate-in fade-in">
            <button
              onClick={() => {
                onOpenGuideModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-rose-700 bg-rose-50 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-600" />
                推广挂链全攻略 (新手教学)
              </span>
              <span className="text-xs bg-rose-600 text-white px-1.5 rounded">必读</span>
            </button>

            <button
              onClick={() => {
                onOpenAffiliateModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-800 bg-zinc-50 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-zinc-600" />
                达人账号与推广UID绑定
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                {affiliateConfig.autoWashEnabled ? '自动洗链中' : '未开启'}
              </span>
            </button>

            <button
              onClick={() => {
                onOpenQuickWashModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              单链接快速洗链转换工具
            </button>

            <button
              onClick={() => {
                onOpenRevenueModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              推广佣金收益测算器
            </button>
          </div>
        )}

      </div>
    </header>
  );
};

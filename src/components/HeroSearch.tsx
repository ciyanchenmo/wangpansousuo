import React, { useRef } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  SlidersHorizontal,
  Cloud,
  CheckCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { PanType, ResourceCategory, SearchFilter, AffiliateConfig } from '../types';
import { POPULAR_KEYWORDS } from '../data/mockResources';

interface HeroSearchProps {
  filter: SearchFilter;
  onFilterChange: (newFilter: Partial<SearchFilter>) => void;
  affiliateConfig: AffiliateConfig;
  onOpenAffiliateModal: () => void;
  onOpenGuideModal: () => void;
  totalResults: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filter,
  onFilterChange,
  affiliateConfig,
  onOpenAffiliateModal,
  onOpenGuideModal,
  totalResults,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const PAN_TABS: { id: PanType | 'all'; label: string; dotColor: string }[] = [
    { id: 'all', label: '全部网盘', dotColor: 'bg-zinc-400' },
    { id: 'quark', label: '夸克网盘 (佣金最高)', dotColor: 'bg-rose-500' },
    { id: 'uc', label: 'UC网盘 (拉新强)', dotColor: 'bg-orange-500' },
    { id: 'baidu', label: '百度网盘', dotColor: 'bg-blue-500' },
    { id: 'aliyun', label: '阿里云盘', dotColor: 'bg-amber-500' },
    { id: 'xunlei', label: '迅雷云盘', dotColor: 'bg-sky-500' },
  ];

  const CATEGORY_TABS: { id: ResourceCategory; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'movie', label: '电影' },
    { id: 'tv', label: '剧集' },
    { id: 'anime', label: '动漫' },
    { id: 'study', label: '学习考证' },
    { id: 'software', label: '软件无损' },
    { id: 'documentary', label: '纪录片' },
    { id: 'variety', label: '综艺' },
  ];

  const handleClear = () => {
    onFilterChange({ keyword: '' });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-zinc-50 to-white pt-8 pb-6 border-b border-zinc-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Value Proposition Badge */}
        <div className="flex items-center justify-center mb-3">
          <div 
            onClick={onOpenGuideModal}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all cursor-pointer shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-ping" />
            <span className="font-semibold">借鸡生蛋模式：</span>
            <span>零本地存储 · 全网资源秒转存 · 自动化挂载达人推广赚佣金</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            全网影视资料 <span className="text-rose-600">网盘资源搜索引擎</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
            一键聚合夸克、阿里、百度、UC主流网盘片源，支持自动洗链重分享与达人推广变现
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex items-center shadow-lg shadow-zinc-200/60 rounded-2xl bg-white border-2 border-zinc-200 focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/10 transition-all">
            <div className="pl-4 text-zinc-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              id="main-resource-search-input"
              value={filter.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="搜索电影、热播剧、动漫、考研网课、游戏OST (例如: 庆余年、抓娃娃、黑神话)..."
              className="w-full py-4 pl-3 pr-24 text-base text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none"
            />

            {filter.keyword && (
              <button
                onClick={handleClear}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors mr-2"
                title="清空"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onFilterChange({ keyword: filter.keyword })}
              className="mr-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all shadow-sm shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <span>搜索</span>
            </button>
          </div>
        </div>

        {/* Hot Keywords */}
        <div className="mt-3.5 max-w-3xl mx-auto flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-zinc-400 font-medium shrink-0">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>大家都在搜:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {POPULAR_KEYWORDS.slice(0, 7).map((kw) => (
              <button
                key={kw}
                onClick={() => onFilterChange({ keyword: kw })}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filter.keyword === kw
                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900 border border-transparent'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Pan Type Filters */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-zinc-400" />
              选择网盘渠道
            </span>
            <span className="text-xs text-zinc-400">
              已找到 <strong className="text-zinc-800 font-semibold">{totalResults}</strong> 条资源
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PAN_TABS.map((tab) => {
              const active = filter.panType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onFilterChange({ panType: tab.id })}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    active
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-700 border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Tabs & Filter Settings */}
        <div className="mt-3 max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {CATEGORY_TABS.map((cat) => {
              const active = filter.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onFilterChange({ category: cat.id })}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">排序:</span>
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1 text-xs text-zinc-700 font-medium focus:outline-none focus:border-rose-500"
            >
              <option value="match">综合匹配度</option>
              <option value="latest">最新收录</option>
              <option value="views">热度/下载量</option>
              <option value="size">文件体积</option>
            </select>
          </div>
        </div>

        {/* Live Affiliate Status Notice Strip */}
        <div className="mt-5 max-w-4xl mx-auto">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 flex items-center justify-between flex-wrap gap-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-emerald-800">
                  {affiliateConfig.autoWashEnabled ? '推广挂链引擎运行中' : '推广挂链已关闭'}
                </span>
                <span className="text-emerald-700 hidden sm:inline">
                  | 搜索出的夸克网盘与UC网盘出链已自动绑定您的专属推广参数 (UID: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">{affiliateConfig.quarkUid || '未填'}</code>)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAffiliateModal}
                className="font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
              >
                修改推广参数
              </button>
              <span className="text-emerald-300">·</span>
              <button
                onClick={onOpenGuideModal}
                className="font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
              >
                挂链变现全攻略
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

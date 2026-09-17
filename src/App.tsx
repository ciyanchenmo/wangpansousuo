import React, { useState, useEffect, useMemo } from 'react';
import { 
  SearchFilter, 
  ResourceItem, 
  AffiliateConfig, 
  PanType, 
  ResourceCategory 
} from './types';
import { 
  loadAffiliateConfig, 
  saveAffiliateConfig, 
  DEFAULT_AFFILIATE_CONFIG 
} from './utils/affiliate';
import { 
  searchResources, 
  INITIAL_RESOURCES, 
  POPULAR_KEYWORDS 
} from './data/mockResources';

import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { AffiliateModal } from './components/AffiliateModal';
import { AffiliateGuideModal } from './components/AffiliateGuideModal';
import { QuickWashModal } from './components/QuickWashModal';
import { RevenueCalculatorModal } from './components/RevenueCalculatorModal';
import { Footer } from './components/Footer';

import { 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  Flame, 
  Inbox, 
  RotateCcw,
  Zap,
  BookOpen,
  DollarSign
} from 'lucide-react';

export default function App() {
  // 推广配置
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(loadAffiliateConfig);

  // 搜索与筛选状态
  const [filter, setFilter] = useState<SearchFilter>({
    keyword: '',
    panType: 'all',
    category: 'all',
    resolution: 'all',
    sortBy: 'match',
  });

  // 弹窗状态
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isQuickWashModalOpen, setIsQuickWashModalOpen] = useState(false);
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);

  // 动态检索结果
  const searchResults = useMemo(() => {
    return searchResources(
      filter.keyword,
      filter.panType,
      filter.category,
      filter.resolution,
      filter.sortBy
    );
  }, [filter]);

  const handleFilterChange = (newFilter: Partial<SearchFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleSaveAffiliateConfig = (newConfig: AffiliateConfig) => {
    setAffiliateConfig(newConfig);
    saveAffiliateConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 flex flex-col font-['Noto_Sans_SC','Plus_Jakarta_Sans',sans-serif]">
      
      {/* 顶部导航 */}
      <Navbar
        affiliateConfig={affiliateConfig}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenQuickWashModal={() => setIsQuickWashModalOpen(true)}
        onOpenRevenueModal={() => setIsRevenueModalOpen(true)}
        totalResourcesCount={searchResults.length}
      />

      {/* 搜索与过滤主要区域 */}
      <main className="flex-1">
        <HeroSearch
          filter={filter}
          onFilterChange={handleFilterChange}
          affiliateConfig={affiliateConfig}
          onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
          onOpenGuideModal={() => setIsGuideModalOpen(true)}
          totalResults={searchResults.length}
        />

        {/* 资源列表内容区 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* 状态与统计栏 */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span>{filter.keyword ? `“${filter.keyword}” 的搜索结果` : '全网热门推荐片源与课件'}</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-200/80 text-zinc-700">
                {searchResults.length} 个
              </span>
            </div>

            {/* Quick Resolution Tags */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-400 font-medium">清晰度:</span>
              {['all', '4K原盘', '1080P', '杜比视界'].map((res) => (
                <button
                  key={res}
                  onClick={() => handleFilterChange({ resolution: res })}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    filter.resolution === res
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  {res === 'all' ? '全部清晰度' : res}
                </button>
              ))}
            </div>
          </div>

          {/* 资源网格展示 */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {searchResults.map((item) => (
                <ResourceCard
                  key={item.id}
                  resource={item}
                  affiliateConfig={affiliateConfig}
                  onSelect={(res) => setSelectedResource(res)}
                  onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
                />
              ))}
            </div>
          ) : (
            /* 空状态 */
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-zinc-800 text-base">未找到完全匹配的网盘资源</h3>
              <p className="text-xs text-zinc-500 mt-1.5">
                请尝试更换关键词，或从下方热门推荐中选择
              </p>
              <div className="mt-5 flex items-center justify-center gap-1.5 flex-wrap">
                {POPULAR_KEYWORDS.slice(0, 5).map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleFilterChange({ keyword: kw })}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 text-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleFilterChange({ keyword: '', panType: 'all', category: 'all', resolution: 'all' })}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置所有筛选条件</span>
              </button>
            </div>
          )}

        </div>
      </main>

      {/* 底部版权与免责声明 */}
      <Footer
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenAffiliate={() => setIsAffiliateModalOpen(true)}
        onOpenQuickWash={() => setIsQuickWashModalOpen(true)}
      />

      {/* 资源详情弹窗 */}
      <ResourceDetailModal
        resource={selectedResource}
        affiliateConfig={affiliateConfig}
        onClose={() => setSelectedResource(null)}
        onOpenAffiliateModal={() => {
          setSelectedResource(null);
          setIsAffiliateModalOpen(true);
        }}
        onOpenGuideModal={() => {
          setSelectedResource(null);
          setIsGuideModalOpen(true);
        }}
      />

      {/* 推广挂链达人参数配置弹窗 */}
      <AffiliateModal
        isOpen={isAffiliateModalOpen}
        onClose={() => setIsAffiliateModalOpen(false)}
        config={affiliateConfig}
        onSave={handleSaveAffiliateConfig}
        onOpenGuide={() => {
          setIsAffiliateModalOpen(false);
          setIsGuideModalOpen(true);
        }}
      />

      {/* 怎么挂推广链接新手保姆级教程弹窗 */}
      <AffiliateGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onOpenConfigModal={() => {
          setIsGuideModalOpen(false);
          setIsAffiliateModalOpen(true);
        }}
      />

      {/* 单链接快速洗链工具弹窗 */}
      <QuickWashModal
        isOpen={isQuickWashModalOpen}
        onClose={() => setIsQuickWashModalOpen(false)}
        affiliateConfig={affiliateConfig}
      />

      {/* 推广佣金收益测算器弹窗 */}
      <RevenueCalculatorModal
        isOpen={isRevenueModalOpen}
        onClose={() => setIsRevenueModalOpen(false)}
        onOpenGuide={() => {
          setIsRevenueModalOpen(false);
          setIsGuideModalOpen(true);
        }}
      />

    </div>
  );
}

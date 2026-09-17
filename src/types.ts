export type PanType = 'quark' | 'aliyun' | 'baidu' | 'uc' | 'xunlei' | '115';

export type ResourceCategory = 'all' | 'movie' | 'tv' | 'anime' | 'documentary' | 'variety' | 'study' | 'software';

export interface ResourceItem {
  id: string;
  title: string;
  category: 'movie' | 'tv' | 'anime' | 'documentary' | 'variety' | 'study' | 'software';
  panType: PanType;
  resolution: '4K原盘' | '1080P' | '杜比视界' | '无损音频' | '全套资料' | '合集';
  size: string;
  updateTime: string;
  poster: string;
  rating?: number;
  tags: string[];
  originalUrl: string;
  extractCode?: string;
  episodes?: string;
  description: string;
  sharesCount: number;
  viewsCount: number;
  filesSummary?: string[];
  isVerified: boolean;
}

export interface AffiliateConfig {
  quarkUid: string;
  quarkCookie: string;
  ucId: string;
  baiduPid: string;
  aliyunCode: string;
  xunleiCode: string;
  rentuibangToken: string;
  autoWashEnabled: boolean;
  customIntermediateNotice: boolean;
  intermediateTipText: string;
  washMode: 'auto-robot' | 'smart-redirect' | 'manual-mapping';
}

export interface SearchFilter {
  keyword: string;
  panType: PanType | 'all';
  category: ResourceCategory;
  resolution: string;
  sortBy: 'match' | 'latest' | 'size' | 'views';
}

export interface WashTaskRecord {
  id: string;
  timestamp: number;
  sourceUrl: string;
  washedUrl: string;
  panType: PanType;
  status: 'success' | 'processing' | 'failed';
  title: string;
  estimatedEarnings: string;
}

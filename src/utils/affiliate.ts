import { AffiliateConfig, PanType } from '../types';

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  quarkUid: 'QK89234190',
  quarkCookie: '',
  ucId: 'UC681023',
  baiduPid: 'BD_PAN_8832',
  aliyunCode: 'ALI_COMM_901',
  xunleiCode: 'XL_PROMO_77',
  rentuibangToken: 'RTB_TOKEN_DEMO',
  autoWashEnabled: true,
  customIntermediateNotice: true,
  intermediateTipText: '资源已由站长专属转存通道提供，转存高速不限速',
  washMode: 'auto-robot',
};

const STORAGE_KEY = 'pansearch_affiliate_config';

export function loadAffiliateConfig(): AffiliateConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_AFFILIATE_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load affiliate config from localStorage', e);
  }
  return DEFAULT_AFFILIATE_CONFIG;
}

export function saveAffiliateConfig(config: AffiliateConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save affiliate config to localStorage', e);
  }
}

/**
 * 将他人的普通公开网盘链接，“洗链”转换为站长绑定UID后的专属推广链接
 */
export function washPanLink(
  originalUrl: string,
  panType: PanType,
  config: AffiliateConfig
): {
  washedUrl: string;
  isWashed: boolean;
  uidUsed: string;
  panName: string;
  commissionTypes: string[];
} {
  if (!config.autoWashEnabled) {
    return {
      washedUrl: originalUrl,
      isWashed: false,
      uidUsed: '',
      panName: getPanDisplayName(panType),
      commissionTypes: [],
    };
  }

  // 提取原始分享 code
  let code = 'share_' + Math.random().toString(36).substring(2, 10);
  try {
    const urlObj = new URL(originalUrl);
    const pathParts = urlObj.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart) {
      code = lastPart;
    }
  } catch {
    // fallback
  }

  switch (panType) {
    case 'quark': {
      const uid = config.quarkUid || 'QK89234190';
      return {
        washedUrl: `https://pan.quark.cn/s/${code}?from=promotion&uid=${uid}&ref_entry=pc_share`,
        isWashed: true,
        uidUsed: uid,
        panName: '夸克网盘',
        commissionTypes: ['App拉新 (5-10元/单)', 'SVIP充值提成 (30%)', '有效转存 (0.2-0.5元/次)'],
      };
    }
    case 'uc': {
      const uid = config.ucId || 'UC681023';
      return {
        washedUrl: `https://drive.uc.cn/s/${code}?ucid=${uid}&source=affiliate_pan`,
        isWashed: true,
        uidUsed: uid,
        panName: 'UC网盘',
        commissionTypes: ['App拉新 (4-8元/单)', '会员充值分成 (25%)', '转存补贴'],
      };
    }
    case 'baidu': {
      const pid = config.baiduPid || 'BD_PAN_8832';
      return {
        washedUrl: `https://pan.baidu.com/s/${code}?pid=${pid}&channel=union_affiliate`,
        isWashed: true,
        uidUsed: pid,
        panName: '百度网盘',
        commissionTypes: ['百度联盟拉新 (3-6元/单)', '超级会员充值返佣 (15%-25%)'],
      };
    }
    case 'aliyun': {
      const codeId = config.aliyunCode || 'ALI_COMM_901';
      return {
        washedUrl: `https://www.alipan.com/s/${code}?ref=${codeId}`,
        isWashed: true,
        uidUsed: codeId,
        panName: '阿里云盘',
        commissionTypes: ['达人招募拉新', '第三方授权分成'],
      };
    }
    case 'xunlei': {
      const codeId = config.xunleiCode || 'XL_PROMO_77';
      return {
        washedUrl: `https://pan.xunlei.com/s/${code}?from=union&tid=${codeId}`,
        isWashed: true,
        uidUsed: codeId,
        panName: '迅雷云盘',
        commissionTypes: ['白金会员分成 (30%)', '客户端新激活'],
      };
    }
    default:
      return {
        washedUrl: originalUrl,
        isWashed: false,
        uidUsed: '',
        panName: '115网盘',
        commissionTypes: ['常规分享链接'],
      };
  }
}

export function getPanDisplayName(panType: PanType): string {
  const map: Record<PanType, string> = {
    quark: '夸克网盘',
    aliyun: '阿里云盘',
    baidu: '百度网盘',
    uc: 'UC网盘',
    xunlei: '迅雷云盘',
    '115': '115网盘',
  };
  return map[panType] || '网盘';
}

export function getPanBadgeColor(panType: PanType): {
  bg: string;
  text: string;
  border: string;
  iconBg: string;
} {
  switch (panType) {
    case 'quark':
      return {
        bg: 'bg-rose-50 text-rose-700',
        text: 'text-rose-600',
        border: 'border-rose-200',
        iconBg: 'bg-rose-500',
      };
    case 'aliyun':
      return {
        bg: 'bg-amber-50 text-amber-700',
        text: 'text-amber-600',
        border: 'border-amber-200',
        iconBg: 'bg-amber-500',
      };
    case 'baidu':
      return {
        bg: 'bg-blue-50 text-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-200',
        iconBg: 'bg-blue-500',
      };
    case 'uc':
      return {
        bg: 'bg-orange-50 text-orange-700',
        text: 'text-orange-600',
        border: 'border-orange-200',
        iconBg: 'bg-orange-500',
      };
    case 'xunlei':
      return {
        bg: 'bg-sky-50 text-sky-700',
        text: 'text-sky-600',
        border: 'border-sky-200',
        iconBg: 'bg-sky-500',
      };
    case '115':
      return {
        bg: 'bg-indigo-50 text-indigo-700',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        iconBg: 'bg-indigo-500',
      };
    default:
      return {
        bg: 'bg-zinc-50 text-zinc-700',
        text: 'text-zinc-600',
        border: 'border-zinc-200',
        iconBg: 'bg-zinc-500',
      };
  }
}

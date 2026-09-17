import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  HelpCircle, 
  Copy, 
  Check, 
  Terminal, 
  ShieldAlert, 
  Layers, 
  DollarSign, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock
} from 'lucide-react';

interface AffiliateGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConfigModal: () => void;
}

export const AffiliateGuideModal: React.FC<AffiliateGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenConfigModal,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'apply' | 'wash' | 'code' | 'faq'>('flow');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const pythonScript = `# ========================================================
# 夸克/网盘全自动洗链与转存脚本示例 (基于 Python + requests)
# 对应开源项目: quark-auto-save-x (QASX) 核心逻辑
# ========================================================
import requests
import time

QUARK_COOKIE = "你的夸克达人账号Cookie_从浏览器F12获取"
TARGET_DIR_ID = "0"  # 临时转存目录ID
MY_UID = "QK89234190"  # 你的达人推广UID

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Cookie": QUARK_COOKIE,
    "Content-Type": "application/json"
}

def auto_wash_link(other_share_url):
    """
    1. 解析他人公开分享链接
    2. 自动调用转存API存入你的临时目录
    3. 生成属于你的专属推广分享链接
    4. 30分钟后自动删除原临时文件防爆盘
    """
    print(f"[*] 收到新资源请求: {other_share_url}")
    # 模拟调用网盘转存API
    # resp = requests.post("https://drive.quark.cn/1/clouddrive/share/save", headers=headers, json={...})
    time.sleep(0.5)
    
    # 转存成功后，立即重分享出链，带上推广UID
    share_id = "sh_" + str(int(time.time()))
    my_washed_url = f"https://pan.quark.cn/s/{share_id}?from=promotion&uid={MY_UID}"
    
    print(f"[+] 洗链成功！专属推广链接: {my_washed_url}")
    return my_washed_url

# 定时任务：每30分钟清理网盘回收站，实现“零存储成本”无限循环
def clean_temp_trash():
    print("[*] 清空临时目录与回收站完成，网盘空间已释放！")
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">网盘推广挂链与自动变现全攻略</h2>
              <p className="text-xs text-zinc-400">
                从申请达人资格到搭建全自动洗链搜索引擎的完整流程
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-zinc-50 border-b border-zinc-200 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'flow'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            1. 零成本“借鸡生蛋”原理
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'apply'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            2. 怎么申请推广资格？
          </button>
          <button
            onClick={() => setActiveTab('wash')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'wash'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            3. 推广收益与结算模式
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'code'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            4. 自动化洗链代码与架构
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'faq'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            5. 防封与防爆盘指南
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-zinc-700 leading-relaxed">
          
          {/* TAB 1: 零成本原理 */}
          {activeTab === 'flow' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h3 className="font-bold text-amber-900 text-base mb-1 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  你完全不需要自己拥有这些几十GB的影视原盘！
                </h3>
                <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
                  全网4K电影动辄几百上千GB，普通个人站长买硬盘或云服务器根本承担不起。
                  核心逻辑就是<strong>“借鸡生蛋”</strong>：文件都在网盘云端，你只需要一个拥有推广权限的网盘普通账号（通常夸克或UC），在后台将他人链接<strong>“秒转存 ➔ 生成你的新专属分享链接 ➔ 30分钟后自动清空临时原文件”</strong>，实现零存储成本无限循环！
                </p>
              </div>

              {/* Architecture 3-Step Infographic */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-2">
                    1
                  </div>
                  <h4 className="font-bold text-zinc-900 text-sm">第一步：前端与海报</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    调用TMDB或豆瓣公开API拉取最新剧集榜单和海报（本项目已内置），提供高颜值搜索框与资源聚合展示。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center mb-2">
                    2
                  </div>
                  <h4 className="font-bold text-zinc-900 text-sm">第二步：资源聚合(找片源)</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    用户搜索片名时，通过公开接口、TG频道或PanSou开源爬虫索引到全网他人公开发布的网盘分享链接。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-2">
                    3
                  </div>
                  <h4 className="font-bold text-zinc-900 text-sm">第三步：自动转存(洗链)</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    系统调网盘API把公开资源瞬间转存进你的达人网盘临时目录，生成绑定你UID的全新推广分享链接返回给访客！
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">立即在本项目中体验推广挂链</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">只需在控制台中输入你的达人UID，所有出链即刻自动带参</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConfigModal();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  去配置我的推广UID
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 去哪里申请 */}
          {activeTab === 'apply' && (
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-900 text-base">
                主流网盘推广资格申请渠道汇总
              </h3>
              <p className="text-xs text-zinc-600">
                网盘服务商不会给单个链接手动加后缀，而是将<strong>推广权限直接与你的网盘账号（UID）绑定</strong>。只要开通权限，该账号生成的任何分享链接都会被自动识别为你的专属推广链接。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 渠道1: 任推邦 */}
                <div className="p-4 rounded-xl bg-white border-2 border-rose-100 hover:border-rose-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      任推邦平台 (强烈推荐 · 小白首选)
                    </span>
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      免门槛秒过
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-2.5">
                    国内最大的综合类推广拉新分销平台，阿里官方一级授权服务商。
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1 mb-3">
                    <li>• <strong>支持网盘:</strong> 夸克、UC、百度、迅雷一站式开通</li>
                    <li>• <strong>申请门槛:</strong> 手机号注册即可入驻，申请达人无需粉丝数</li>
                    <li>• <strong>结算周期:</strong> 提现门槛低 (通常T+1或每周自动到账)</li>
                  </ul>
                  <div className="text-[11px] text-zinc-400 bg-zinc-50 p-2 rounded">
                    入驻流程: 注册任推邦账号 ➔ 搜索“夸克网盘达人” ➔ 绑定你的夸克手机号 ➔ 审核通过后即开通达人UID。
                  </div>
                </div>

                {/* 渠道2: 阿里创作者平台 */}
                <div className="p-4 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      夸克网盘官方创作者中心
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                      分成最高
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-2.5">
                    通过夸克App内或夸克创作者平台申请。官方直签，单价最高。
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1 mb-3">
                    <li>• <strong>开通入口:</strong> 夸克App ➔ 我的 ➔ 网盘 ➔ 达人招募 / 创作者分成</li>
                    <li>• <strong>单价优势:</strong> App纯新客拉新可达 8~10元/单，SVIP提成30%</li>
                    <li>• <strong>专属权限:</strong> 可获得开放API与更大转存临时存储空间</li>
                  </ul>
                </div>

                {/* 渠道3: UC网盘达人 */}
                <div className="p-4 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      UC网盘推广联盟
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                      移动端拉新强
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-2.5">
                    UC浏览器自带超大用户基础，手机端不限速播放对小白用户吸引力极大。
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1">
                    <li>• <strong>结算维度:</strong> 支持转存点击与移动端App新激活</li>
                    <li>• <strong>单价:</strong> 4~8元/拉新，配合短剧和动漫类目转化率极高</li>
                  </ul>
                </div>

                {/* 渠道4: 百度网盘联盟 */}
                <div className="p-4 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      百度网盘内容联盟
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                      老牌基数大
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-2.5">
                    百度网盘官方开放平台，针对考研课件、IT技术资料转化率非常稳定。
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1">
                    <li>• <strong>结算维度:</strong> 超级会员SVIP购买返佣 (15%~25%) + PC新客拉新</li>
                    <li>• <strong>渠道ID:</strong> 审核后获得专属 PID 渠道标识</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 收益结算 */}
          {activeTab === 'wash' && (
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-900 text-base">
                网盘推广是如何赚到钱的？三大收益结算维度
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    ① CPA 纯拉新 (收益大头)
                  </div>
                  <div className="text-2xl font-black text-emerald-600 my-1">
                    5 ~ 10 <span className="text-sm font-semibold">元/人</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed mt-2">
                    未安装过该网盘App的用户，通过你的专属链接<strong>下载网盘客户端并首次登录</strong>。每成功拉新一位即可获得 5~10 元佣金！
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                    ② CPS 会员充值分成
                  </div>
                  <div className="text-2xl font-black text-blue-600 my-1">
                    20% ~ 40% <span className="text-sm font-semibold">分成</span>
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed mt-2">
                    用户为了享受不限速下载或超大容量，通过你的链接<strong>购买了 SVIP 会员月卡/年卡</strong>，你可直接躺赚充值金额的 20%~40% 佣金提成！
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
                    ③ 有效转存补贴
                  </div>
                  <div className="text-2xl font-black text-purple-600 my-1">
                    0.2 ~ 0.5 <span className="text-sm font-semibold">元/次</span>
                  </div>
                  <p className="text-xs text-purple-900 leading-relaxed mt-2">
                    部分平台针对已安装App的老活跃用户，只要他们把你的资源转存到自己的网盘，也会给予微量转存补贴，日积月累非常可观！
                  </p>
                </div>
              </div>

              {/* Real Earnings Example */}
              <div className="p-4 rounded-xl bg-zinc-900 text-white">
                <h4 className="font-bold text-sm text-zinc-100 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  真实流量收益推算模型 (以日搜索UV 1000 为例)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-800/80">
                    <div className="text-zinc-400">每日访问</div>
                    <div className="text-base font-bold text-white mt-0.5">1,000 UV</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-800/80">
                    <div className="text-zinc-400">转存点击 (35%)</div>
                    <div className="text-base font-bold text-white mt-0.5">350 次转存</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-800/80">
                    <div className="text-zinc-400">新客拉新 (5%)</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">18 人 (约140元)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-800/80">
                    <div className="text-zinc-400">预估月综合收益</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">5,000 ~ 9,000 元</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 代码与自动化架构 */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-zinc-900 text-base">
                    开源社区主流自动化技术架构 (PanHub + PanSou + QASX)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    截图提到的开源架构搭配方案与全自动转存脚本
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '已复制代码' : '复制脚本'}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>auto_save_wash_robot.py</span>
                  <span>Python 3.10+</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-64 leading-relaxed">
                  {pythonScript}
                </pre>
              </div>

              {/* Open Source Projects Reference */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <h4 className="font-bold text-xs text-zinc-800 mb-2">主流开源生态推荐:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border border-zinc-200">
                    <span className="font-bold text-zinc-900">fish2018/pansou (Go)</span>
                    <p className="text-zinc-500 text-[11px] mt-0.5">目前最火的网盘聚合搜索后端 (GitHub 14k+ Star)，内置多源爬取</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-zinc-200">
                    <span className="font-bold text-zinc-900">x1ao4/quark-auto-save-x</span>
                    <p className="text-zinc-500 text-[11px] mt-0.5">夸克网盘自动转存洗链 WebUI，支持挂载推广达人UID</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 避坑与防封 */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-900 text-base">
                关键注意事项与防封禁策略
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                  <div className="font-bold text-sm text-rose-800 flex items-center gap-1.5 mb-1">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    如何防止网盘容量爆满 (防爆盘)？
                  </div>
                  <p className="leading-relaxed">
                    每个网盘账号只有几百G到几T容量。如果每部4K电影都保留，一天就会把网盘撑爆。
                    <strong>必须设置定时任务（Cron）：每30分钟自动把临时转存目录的文件丢入回收站并清空回收站！</strong>
                    只要生成了专属分享链接，即使原临时文件被删除，只要在网盘保留期内（夸克通常为30天甚至更久），用户依然可以正常转存并计入你的佣金！
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <div className="font-bold text-sm text-amber-800 flex items-center gap-1.5 mb-1">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    如何防止被微信拦截或域名被封？
                  </div>
                  <p className="leading-relaxed">
                    在微信或外部社群分享时，直接发网盘裸链接容易被微信屏蔽。
                    常见做法是<strong>使用防红短链工具</strong>，或者配合<strong>公众号自动回复</strong>（例如：“回复【抓娃娃】获取最新4K不限速链接”），把公域搜索流量沉淀到自己的私域群，长期变现。
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            想马上测试挂链效果？使用单链接洗链工具或直接配置UID
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenConfigModal();
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              打开达人UID配置
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

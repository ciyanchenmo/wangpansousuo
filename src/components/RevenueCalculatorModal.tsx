import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  Sparkles,
  Award
} from 'lucide-react';

interface RevenueCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide: () => void;
}

export const RevenueCalculatorModal: React.FC<RevenueCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenGuide,
}) => {
  const [dailyVisitors, setDailyVisitors] = useState(1500); // 每日搜索独立访客 UV
  const [saveRate, setSaveRate] = useState(35); // 转存点击率 35%
  const [cpaRate, setCpaRate] = useState(4.5); // 新客未安装App拉新率 4.5%
  const [cpsRate, setCpsRate] = useState(2.0); // 会员购买率 2%

  if (!isOpen) return null;

  // 测算公式
  const dailySaves = Math.round((dailyVisitors * saveRate) / 100);
  const dailyNewInstalls = Math.round((dailySaves * cpaRate) / 100);
  const dailySvipBuyers = Math.round((dailySaves * cpsRate) / 100);

  const cpaIncomeDaily = dailyNewInstalls * 8; // 夸克/UC平均拉新8元
  const cpsIncomeDaily = dailySvipBuyers * 25; // 平均SVIP返佣25元
  const saveBonusDaily = dailySaves * 0.15; // 基础转存补贴

  const totalDailyIncome = Math.round(cpaIncomeDaily + cpsIncomeDaily + saveBonusDaily);
  const totalMonthlyIncome = totalDailyIncome * 30;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">网盘推广挂链收益测算模型</h2>
              <p className="text-xs text-zinc-400">
                根据网站实际搜索流量与转化率，动态模拟预估月度推广佣金
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

        {/* Sliders & Results */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Revenue Highlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-lg shadow-emerald-700/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                预估月度总推广收益 (CPA+CPS+补贴)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/20 text-white">
                自动提现至银行卡/支付宝
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                ¥ {totalMonthlyIncome.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-emerald-200">
                / 月 (预估每日约 ¥{totalDailyIncome})
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/40 grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-emerald-200 text-[11px]">拉新贡献 (CPA)</div>
                <div className="font-bold text-sm mt-0.5">¥ {(cpaIncomeDaily * 30).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-emerald-200 text-[11px]">会员提成 (CPS)</div>
                <div className="font-bold text-sm mt-0.5">¥ {(cpsIncomeDaily * 30).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-emerald-200 text-[11px]">转存补贴</div>
                <div className="font-bold text-sm mt-0.5">¥ {Math.round(saveBonusDaily * 30).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4">
            
            {/* Slider 1: Daily Visitors */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-2">
                <span>每日搜索独立访客 (UV):</span>
                <span className="text-rose-600 text-sm font-mono">{dailyVisitors.toLocaleString()} 人/天</span>
              </div>
              <input
                type="range"
                min={200}
                max={20000}
                step={100}
                value={dailyVisitors}
                onChange={(e) => setDailyVisitors(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>200 UV (小型站)</span>
                <span>5,000 UV (中型站)</span>
                <span>20,000 UV (头部站)</span>
              </div>
            </div>

            {/* Slider 2: Save Rate */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-2">
                <span>访客转存点击率:</span>
                <span className="text-emerald-600 text-sm font-mono">{saveRate}% (约 {dailySaves} 次转存)</span>
              </div>
              <input
                type="range"
                min={10}
                max={70}
                step={1}
                value={saveRate}
                onChange={(e) => setSaveRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Slider 3: CPA Conversion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-1.5">
                  <span>App拉新转化率:</span>
                  <span className="text-blue-600 font-mono">{cpaRate}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.5}
                  value={cpaRate}
                  onChange={(e) => setCpaRate(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[11px] text-zinc-500 mt-1">单价约 8 元/人</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-1.5">
                  <span>SVIP充值比例:</span>
                  <span className="text-amber-600 font-mono">{cpsRate}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.5}
                  value={cpsRate}
                  onChange={(e) => setCpsRate(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <p className="text-[11px] text-zinc-500 mt-1">单笔分成约 25 元</p>
              </div>
            </div>

          </div>

          {/* Expert Tips */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              如何让网盘推广收益翻倍？
            </div>
            <p>1. <strong>跟紧爆款剧集与院线首发</strong>：新片上映期搜索量最高，未安装网盘App的小白新用户最多，拉新转化率能达8%以上！</p>
            <p>2. <strong>主推夸克网盘与UC网盘</strong>：这两家目前拉新奖励与SVIP分成力度最大，手机端自动调起转存体验最顺畅。</p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenGuide();
            }}
            className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
          >
            查看推广资格申请指南 ➔
          </button>
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

import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Save, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import { AffiliateConfig } from '../types';
import { DEFAULT_AFFILIATE_CONFIG } from '../utils/affiliate';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AffiliateConfig;
  onSave: (config: AffiliateConfig) => void;
  onOpenGuide: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onOpenGuide,
}) => {
  const [formData, setFormData] = useState<AffiliateConfig>(config);
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleChange = (key: keyof AffiliateConfig, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData(DEFAULT_AFFILIATE_CONFIG);
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
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">推广达人账号与洗链参数配置</h2>
              <p className="text-xs text-zinc-400">
                配置您在各平台签约获得的推广UID，所有出链将自动归属于您的账户
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Main Master Switch: Auto-wash */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <span>全自动洗链与推广参数重写</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-emerald-200 text-emerald-900">
                    建议常开
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-0.5">
                  开启后，本站搜索出的所有他人网盘链接，将自动转换为带您专属UID的推广链接
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.autoWashEnabled}
                onChange={(e) => handleChange('autoWashEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Quick Guide Hint */}
          <div className="text-xs bg-zinc-50 p-3 rounded-xl border border-zinc-200 flex items-center justify-between">
            <span className="text-zinc-600">
              不知道在哪里找自己的推广UID？查看保姆级申请指引
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenGuide();
              }}
              className="text-rose-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>查看新手攻略</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Input Grid */}
          <div className="space-y-4">
            
            {/* 夸克网盘达人配置 */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  夸克网盘推广达人 UID (主要盈利点)
                </label>
                <span className="text-[11px] text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded">
                  拉新 5~10元/单 + SVIP 30%
                </span>
              </div>
              <input
                type="text"
                value={formData.quarkUid}
                onChange={(e) => handleChange('quarkUid', e.target.value)}
                placeholder="例如: QK89234190 或 夸克账号ID"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
              <p className="text-[11px] text-zinc-500">
                来源: 任推邦后台绑定的夸克达人账号ID，或夸克创作者中心分配的专属UID。
              </p>
            </div>

            {/* UC网盘达人配置 */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  UC网盘达人 / 渠道号 ID
                </label>
                <span className="text-[11px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded">
                  移动端转化率极高
                </span>
              </div>
              <input
                type="text"
                value={formData.ucId}
                onChange={(e) => handleChange('ucId', e.target.value)}
                placeholder="例如: UC681023"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
            </div>

            {/* 百度网盘与阿里网盘 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2">
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  百度网盘联盟 PID
                </label>
                <input
                  type="text"
                  value={formData.baiduPid}
                  onChange={(e) => handleChange('baiduPid', e.target.value)}
                  placeholder="例如: BD_PAN_8832"
                  className="w-full px-3 py-2 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2">
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  阿里云盘达人邀请码
                </label>
                <input
                  type="text"
                  value={formData.aliyunCode}
                  onChange={(e) => handleChange('aliyunCode', e.target.value)}
                  placeholder="例如: ALI_COMM_901"
                  className="w-full px-3 py-2 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 自定义温馨提示语 */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <label className="text-xs font-bold text-zinc-900">
                出链转存提示文案 (展示给转存访客)
              </label>
              <input
                type="text"
                value={formData.intermediateTipText}
                onChange={(e) => handleChange('intermediateTipText', e.target.value)}
                placeholder="例如: 资源已由站长专属转存通道提供，转存高速不限速"
                className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-rose-500"
              />
            </div>

          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>恢复演示默认值</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                id="btn-save-affiliate-config"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>保存配置</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {showSavedToast && (
            <div className="p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <Check className="w-4 h-4" />
              <span>推广配置保存成功！所有出链已自动绑定您的专属推广参数</span>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

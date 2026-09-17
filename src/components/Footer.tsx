import React from 'react';
import { ShieldCheck, BookOpen, Share2, Zap, Heart } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenAffiliate: () => void;
  onOpenQuickWash: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onOpenAffiliate,
  onOpenQuickWash,
}) => {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-10 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-zinc-800">
          
          {/* Col 1 */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>PanSearch 网盘资源搜索引擎</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              聚合全网影视、动漫、考研课程与大厂课件资源，基于“借鸡生蛋”零自存模式开发。支持一键对接夸克网盘达人、UC网盘达人、百度网盘联盟，实现搜索流量全自动变现。
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              推广变现中心
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={onOpenGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  怎么挂自己的推广链接 (新手教程)
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAffiliate}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  达人推广UID与洗链配置
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenQuickWash}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  单链接一键洗链工具
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              开源生态架构
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>• 前端/聚合: joyce677/panhub & PanSou</li>
              <li>• 自动转存出链: x1ao4/quark-auto-save-x</li>
              <li>• 数据源支持: 夸克 / UC / 百度 / 阿里 / 迅雷</li>
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2">
          <div>
            本站仅为网盘分享链接聚合检索与展示工具，所有文件均存储在对应网盘官方云端，本站不存储任何音频或视频文件。
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span>Powered by PanSearch & Affiliate Robot</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

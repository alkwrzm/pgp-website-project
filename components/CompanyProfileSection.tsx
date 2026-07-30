'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function CompanyProfileSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="about" className={`py-24 md:py-32 border-t transition-colors duration-300 relative ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-black border-white/10 text-white'
    }`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold tracking-widest uppercase ${
            isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-white/10 border-white/10 text-white/70'
          }`}>
            [ ABOUT US ]
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
          Company Profile
        </h2>

        <div className={`p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6 border transition-colors ${
          isLight 
            ? 'bg-slate-50 border-slate-200 text-slate-800' 
            : 'bg-zinc-950/80 border-white/10 text-white'
        }`}>
          <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
            isLight ? 'bg-slate-300/40' : 'bg-white/5'
          }`} />
          
          {lang === 'id' ? (
            /* Indonesian Content (Default) */
            <>
              <p className={`text-lg md:text-xl font-light leading-relaxed ${isLight ? 'text-slate-800' : 'text-white/90'}`}>
                <strong className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>PT PGP INT PACIFIC</strong> adalah perusahaan yang berbasis di Jakarta, Indonesia. Didirikan pada Mei 2026 oleh perusahaan asal Korea Selatan <strong className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>LIVECONNECT CO. LTD</strong>, yang telah sukses menyelenggarakan berbagai proyek di Korea Selatan, Jepang, Tiongkok, Amerika Serikat, dan berbagai negara lainnya.
              </p>

              <p className={`text-base md:text-lg font-light leading-relaxed pt-4 border-t ${
                isLight ? 'text-slate-600 border-slate-200' : 'text-white/70 border-white/10'
              }`}>
                Kini hadir di Indonesia, kami berkomitmen menghadirkan pengalaman baru yang menyenangkan dan berkesan bagi seluruh penggemar K-Pop, K-Drama, dan K-Beauty melalui berbagai acara, aktivitas, dan kolaborasi yang berkualitas.
              </p>
            </>
          ) : (
            /* English Content */
            <>
              <p className={`text-lg md:text-xl font-light leading-relaxed ${isLight ? 'text-slate-800' : 'text-white/90'}`}>
                <strong className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>PT PGP INT PACIFIC</strong> is a company based in Jakarta, Indonesia. Established in May 2026 by South Korea-based live entertainment leader <strong className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>LIVECONNECT CO. LTD</strong>, which has successfully executed major projects across South Korea, Japan, China, the United States, and various other countries worldwide.
              </p>

              <p className={`text-base md:text-lg font-light leading-relaxed pt-4 border-t ${
                isLight ? 'text-slate-600 border-slate-200' : 'text-white/70 border-white/10'
              }`}>
                Now present in Indonesia, we are committed to bringing fresh, exciting, and memorable experiences to all K-Pop, K-Drama, and K-Beauty fans through high-quality events, interactive activities, and strategic cross-border collaborations.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

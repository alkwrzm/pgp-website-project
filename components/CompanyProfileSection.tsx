'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function CompanyProfileSection() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 border-t border-white/10 bg-black relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold tracking-widest text-white/70 uppercase">
            [ ABOUT US ]
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-8 leading-tight">
          Company Profile
        </h2>

        <div className="bg-zinc-950/80 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {lang === 'id' ? (
            /* Indonesian Content (Default) */
            <>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
                <strong className="font-semibold text-white">PT PGP INT PACIFIC</strong> adalah perusahaan yang berbasis di Jakarta, Indonesia. Didirikan pada Mei 2026 oleh perusahaan asal Korea Selatan <strong className="font-semibold text-white">LIVECONNECT CO. LTD</strong>, yang telah sukses menyelenggarakan berbagai proyek di Korea Selatan, Jepang, Tiongkok, Amerika Serikat, dan berbagai negara lainnya.
              </p>

              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed pt-4 border-t border-white/10">
                Kini hadir di Indonesia, kami berkomitmen menghadirkan pengalaman baru yang menyenangkan dan berkesan bagi seluruh penggemar K-Pop, K-Drama, dan K-Beauty melalui berbagai acara, aktivitas, dan kolaborasi yang berkualitas.
              </p>
            </>
          ) : (
            /* English Content */
            <>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
                <strong className="font-semibold text-white">PT PGP INT PACIFIC</strong> is a company based in Jakarta, Indonesia. Established in May 2026 by South Korea-based live entertainment leader <strong className="font-semibold text-white">LIVECONNECT CO. LTD</strong>, which has successfully executed major projects across South Korea, Japan, China, the United States, and various other countries worldwide.
              </p>

              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed pt-4 border-t border-white/10">
                Now present in Indonesia, we are committed to bringing fresh, exciting, and memorable experiences to all K-Pop, K-Drama, and K-Beauty fans through high-quality events, interactive activities, and strategic cross-border collaborations.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

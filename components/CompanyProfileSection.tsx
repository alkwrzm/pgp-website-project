'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function CompanyProfileSection() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 border-t border-[#607D94]/15 bg-[#F4F9FC] text-[#102B3F] transition-colors duration-300 relative">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="p-6 sm:p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-xl shadow-[#1A7B9B]/5 relative overflow-hidden space-y-6 border border-[#607D94]/20 bg-white text-[#102B3F]">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none bg-[#3BBBE2]/10" />

          {lang === 'ko' ? (
            /* Korean Content */
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#102B3F] text-justify [word-break:keep-all]">
              저희 <strong className="font-bold text-[#102B3F]">PT. PGP INT PACIFIC</strong>은 한국에서 검증된 기획력과 실행력을 바탕으로 인도네시아 <strong className="font-semibold text-[#1A7B9B]"><span className="whitespace-nowrap">K-pop</span>, <span className="whitespace-nowrap">K-drama</span>, <span className="whitespace-nowrap">K-beauty</span></strong> 팬들에게 새로운 감동과 기쁨을 드리기 위해 2026년 5월 인도네시아 자카르타에 설립되었으며 인도네시아에서 활기차고 신뢰받는 기업이 되도록 최선의 노력을 다 하겠습니다.
            </p>
          ) : lang === 'en' ? (
            /* English Content */
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#102B3F] text-justify [word-break:keep-all]">
              <strong className="font-bold text-[#102B3F]">PT. PGP INT PACIFIC</strong> was established in May 2026 in Jakarta, bringing proven planning and execution capabilities from Korea. We are present in Indonesia to deliver fresh, exciting, and memorable experiences for all fans of <strong className="font-semibold text-[#1A7B9B]"><span className="whitespace-nowrap">K-Pop</span>, <span className="whitespace-nowrap">K-Drama</span>, and <span className="whitespace-nowrap">K-Beauty</span></strong> through high-quality events, activities, and strategic collaborations.
            </p>
          ) : (
            /* Indonesian Content (Default) */
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#102B3F] text-justify [word-break:keep-all]">
              <strong className="font-bold text-[#102B3F]">PT. PGP INT PACIFIC</strong> didirikan pada Mei 2026 di Jakarta, dengan membawa pengalaman dan kemampuan yang telah teruji di Korea. Kami hadir di Indonesia untuk memberikan pengalaman baru yang menyenangkan dan berkesan bagi seluruh penggemar <strong className="font-semibold text-[#1A7B9B]"><span className="whitespace-nowrap">K-Pop</span>, <span className="whitespace-nowrap">K-Drama</span>, dan <span className="whitespace-nowrap">K-Beauty</span></strong> melalui berbagai acara, aktivitas, dan kolaborasi yang berkualitas.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

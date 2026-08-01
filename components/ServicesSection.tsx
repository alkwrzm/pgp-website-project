'use client';

import { Service } from '@prisma/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Smartphone,
  Printer,
  Ticket,
  Megaphone,
  Globe,
  Users,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

function ServiceCarousel({
  title,
  images,
  onOpenLightbox,
  previewTitle = 'Preview Produk',
  imageUnit = 'Gambar',
}: {
  title: string;
  images: string[];
  onOpenLightbox: (index: number) => void;
  previewTitle?: string;
  imageUnit?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slide effect (every 3.5 seconds) unless hovered
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full border border-[#607D94]/15 bg-[#F4F9FC] p-4 md:p-6 rounded-2xl overflow-hidden"
    >
      <div className="flex justify-between items-center gap-2 mb-3 pb-3 border-b border-[#607D94]/15">
        <span className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 min-w-0 text-[#102B3F] font-semibold">
          <Images className="w-4 h-4 flex-shrink-0 text-[#3BBBE2]" />
          <span className="truncate">{previewTitle}</span>
        </span>
        <span className="text-xs font-mono text-[#607D94]">
          {currentIdx + 1} / {images.length} {imageUnit}
        </span>
      </div>

      {/* Main Single Photo Showcase (Pure Image Display - No White Canvas) */}
      <div
        onClick={() => onOpenLightbox(currentIdx)}
        className="relative h-64 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden cursor-pointer group/img transition-all duration-300 flex items-center justify-center bg-transparent"
      >
        <Image
          src={images[currentIdx]}
          alt={`${title} preview ${currentIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-contain transition-transform duration-500 group-hover/img:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-[#102B3F]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
          <span className="px-4 py-2 rounded-full bg-[#102B3F]/80 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20">
            <Maximize2 className="w-3.5 h-3.5" /> Lightbox
          </span>
        </div>
      </div>

      {/* Bottom Controls Bar (Outside Image Box) */}
      {images.length > 1 && (
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#607D94]/15">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#607D94]/20 bg-white text-xs font-semibold text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIdx === idx ? 'w-6 bg-[#3BBBE2]' : 'w-2 bg-[#607D94]/30 hover:bg-[#607D94]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#607D94]/20 bg-white text-xs font-semibold text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-xs cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function getLocalizedServiceContent(service: Service, lang: string) {
  const titleLower = service.title.toLowerCase();

  if (titleLower.includes('pocketdrop')) {
    return {
      title: lang === 'ko' ? 'PocketDrop (앱 / 온라인)' : lang === 'en' ? 'PocketDrop (Application / Online)' : service.title,
      subtitle: lang === 'ko' ? '디지털 포토카드 수집 및 리워드 앱' : lang === 'en' ? 'Digital photocard collection & reward app' : (service.subtitle || ''),
      category: lang === 'ko' ? '포토카드 & 굿즈' : 'Photocard & Merchandise',
      description: lang === 'ko' 
        ? 'PocketDrop은 공식 라이선스를 보유한 K-Pop 아티스트의 디지털 포토카드를 수집할 수 있는 플랫폼입니다. 사용자는 디지털 포토카드를 수집하고, 세트를 완성하여 한정판 미공개 실물 포토카드를 받을 수 있으며, 좋아하는 K-Pop 아티스트의 맞춤형 AI 영상 메시지를 받으실수 있습니다.'
        : lang === 'en'
        ? 'PocketDrop is a digital photocard collection platform featuring officially licensed K-Pop artists. Users can collect digital photocards, complete full sets to redeem exclusive, previously unreleased physical photocards, and receive personalized AI-generated video messages from their favorite K-Pop artist.'
        : 'PocketDrop adalah platform untuk mengoleksi photocard digital berlisensi resmi dari artis K-Pop. Pengguna dapat mengoleksi photocard digital, melengkapi set untuk mendapatkan photocard fisik edisi terbatas yang belum pernah dirilis, serta menerima pesan video AI yang dipersonalisasi dari artis K-Pop favorit mereka.',
    };
  }

  if (titleLower.includes('pic2go')) {
    return {
      title: lang === 'ko' ? 'PIC2GO (키오스크 / 오프라인)' : lang === 'en' ? 'PIC2GO (Kiosk / Offline)' : service.title,
      subtitle: lang === 'ko' ? '아이돌 포토 컬렉션 출력 키오스크 기기' : lang === 'en' ? 'Idol photo collection printing kiosk machine' : (service.subtitle || ''),
      category: lang === 'ko' ? '아이돌 포토 & 굿즈' : 'Idol Photo & Merchandise',
      description: lang === 'ko'
        ? 'PIC2GO는 K-Pop 아이돌의 공식 라이선스 미공개 사진을 즉시 출력할 수 있는 키오스크 서비스입니다. PIC2GO에서만 만나볼 수 있는 독점적인 미공개 사진 컬렉션을 통해 팬들에게 더욱 특별한 경험을 제공합니다. 사용자는 원하는 아티스트 이름이나 사진을 검색한 후, 마음에 드는 사진을 선택하여 키오스크에서 바로 출력할 수 있습니다. 빠르고 간편하며 즐거운 이용 과정을 통해 PIC2GO는 K-Pop 아이돌 사진을 더욱 특별하게 소장할 수 있는 개인화된 경험을 제공하며, PIC2GO에서만 얻을 수 있는 독점적인 기념품을 즉시 가져갈 수 있습니다.'
        : lang === 'en'
        ? 'PIC2GO is a kiosk service that allows fans to instantly print officially licensed unreleased K-Pop Idol photos. Featuring an exclusive collection available only at PIC2GO, the service gives fans access to premium photos that cannot be found anywhere else. Users simply search for their favorite artist or desired image, select their preferred photo, and print it instantly. With a fast, convenient, and enjoyable experience, PIC2GO offers a more personalized way to collect K-Pop Idol photos while taking home exclusive keepsakes available only through PIC2GO.'
        : 'PIC2GO merupakan layanan kiosk yang dapat langsung mencetak foto K-Pop Idol secara instan. PIC2GO menyediakan koleksi foto eksklusif yang belum pernah dipublikasikan kepada publik yang diperoleh melalui lisensi resmi. Pengguna hanya perlu mencari nama artis atau gambar yang diinginkan, memilih foto favorit, kemudian langsung mencetaknya melalui kiosk. Dengan proses yang cepat, mudah, dan menyenangkan, PIC2GO menghadirkan pengalaman yang lebih personal dalam mengoleksi foto K-Pop Idol serta memberikan kenang-kenangan eksklusif yang dapat langsung dibawa pulang.',
    };
  }

  if (titleLower.includes('konser') || titleLower.includes('concert') || titleLower.includes('fanmeeting')) {
    return {
      title: lang === 'ko' ? 'K-Pop 콘서트와 팬미팅' : lang === 'en' ? 'K-Pop Concert & Fanmeeting' : 'Konser dan Fanmeeting K-Pop',
      subtitle: lang === 'ko' ? '이벤트 주최 및 팬사인회 기획' : lang === 'en' ? 'Event hosting & fansign organization' : (service.subtitle || ''),
      category: lang === 'ko' ? '콘서트 & 팬미팅' : lang === 'en' ? 'Concert & Fanmeeting' : 'Konser & Fanmeeting',
      description: lang === 'ko'
        ? '인도네시아에서 K-Pop 아이돌들과 K-Drama 배우들의 콘서트 및 팬미팅 그리고 팬싸인회를 통해서 팬들에게 더 큰 즐거움과 기쁨을 드리도록 하겠으며 콘서트 현장과 팬미팅 현장에서 아이돌그리고 배우의 MD 판매와 K-Food 판매도 진행하도록 하겠습니다.'
        : lang === 'en'
        ? 'In Indonesia, through concerts, fanmeetings, and fan signing events featuring K-Pop Idol and K-Drama actors, we will provide fans with greater enjoyment and happiness. Through these events, we will also provide official merchandise (MD) from artists and actors, along with K-Food offerings at concert and fan meeting venues'
        : 'Di Indonesia, melalui konser, fanmeeting, dan fan signing bersama K-Pop Idol serta aktor K-drama, kami berupaya untuk memberikan kesenangan dan kebahagiaan yang lebih besar para penggemar. Di lokasi konser dan lokasi fanmeeting, kami juga akan melakukan penjualan merchandise dari idol dan aktor, serta penjualan K-Food.',
    };
  }

  if (titleLower.includes('iklan') || titleLower.includes('advertising') || titleLower.includes('model') || titleLower.includes('talent')) {
    return {
      title: lang === 'ko' ? '광고 및 모델 에이전시' : lang === 'en' ? 'Advertising/Talent Agency' : 'Agensi Iklan/Model',
      subtitle: lang === 'ko' ? '인도네시아 브랜드 & 한국 아티스트 매칭' : lang === 'en' ? 'Connecting Indonesian Brands & Korean Idols' : (service.subtitle || ''),
      category: lang === 'ko' ? '광고 및 모델 에이전시' : lang === 'en' ? 'Advertising/Talent Agency' : 'Agensi Iklan/Model',
      description: lang === 'ko'
        ? '인도네시아에 진출하는 한국 기업과 인도네시아 아티스트를 광고모델 또는 제품모델로연결해 드릴것이며 한국의 상품이 인도네시아 마케팅 하는것에 대해 크게 도움드릴 수 있도록 하겠습니다.'
        : lang === 'en'
        ? 'We will connect Korean K-pop idols and actors as advertising models or product ambassadors for products manufactured in Indonesia. For artists selected as product models, we will produce exclusive photocards and plan promotional events where these photocards will be distributed as special gifts with product purchases.'
        : 'Kami akan menghubungkan penyanyi idol Korea dan aktor Korea sebagai model iklan atau model produk untuk produk-produk yang diproduksi di Indonesia. Untuk artis yang telah dipilih sebagai model produk, kami akan membuat photocard eksklusif dan juga merencanakan pemberian photocard sebagai hadiah dengan pembelian produk.',
    };
  }

  if (titleLower.includes('penghubung perusahaan') || titleLower.includes('connector') || titleLower.includes('business partnership')) {
    return {
      title: lang === 'ko' ? '기업 파트너십 에이전시' : lang === 'en' ? 'Business Partnership Agency' : 'Agensi Penghubung Perusahaan',
      subtitle: lang === 'ko' ? '한국 브랜드 & 인도네시아 아티스트 매칭' : lang === 'en' ? 'Connecting Korean Brands & Indonesian Artists' : (service.subtitle || ''),
      category: lang === 'ko' ? '기업 파트너십 에이전시' : lang === 'en' ? 'Business Partnership Agency' : 'Agensi Penghubung Perusahaan',
      description: lang === 'ko'
        ? '인도네시아에서 생산되는 상품의 광고모델 또는 제품모델로 한국 아이돌 가수 및 한국배우들을 연결해드릴것이며 상품 모델로 결정된 아티스트의 포토카드를 제작하여 상품판매시 포토카드를 증정하는 행사도 계획하도록 하겠습니다.'
        : lang === 'en'
        ? 'We connect Korean companies entering the Indonesian market with Indonesian artists as advertising models and brand ambassadors, helping them develop effective marketing strategies and enhance brand awareness in Indonesia. Through strategic collaborations, we support Korean brands in successfully promoting their products and expanding their presence in the Indonesian market.'
        : 'Kami menghubungkan perusahaan Korea yang ingin memasuki pasar Indonesia dengan artis Indonesia sebagai model iklan dan brand ambassador, untuk membantu membangun strategi pemasaran yang lebih kuat serta meningkatkan kesadaran merek di Indonesia. Melalui kolaborasi strategis, kami bertujuan mendukung brand Korea dalam mempromosikan produk mereka dan memperluas kehadirannya di pasar Indonesia.',
    };
  }

  if (titleLower.includes('influencer')) {
    return {
      title: lang === 'ko' ? '인플루언서 콜라보레이션' : lang === 'en' ? 'Collaboration with Influencer' : 'Kerjasama Influencer',
      subtitle: lang === 'ko' ? '인도네시아 & 한국 인플루언서 제휴' : lang === 'en' ? 'Indonesian & Korean Influencer Alliances' : (service.subtitle || ''),
      category: lang === 'ko' ? '인플루언서 콜라보레이션' : lang === 'en' ? 'Collaboration with Influencer' : 'Kerjasama Influencer',
      description: lang === 'ko'
        ? '인도네시아 인플루언서와 파트너쉽을 맺고 한국 상품 및 인도네시아 상품 마케팅과 판매에 도움드릴수 있도록 할것이며 한국 인플루언서의 인도네시아 활동에 대해 도움드릴수 있도록 하겠으며 인도네시아 상품이 한국에서 많이 팔릴수 있도록 한국 인플루언서들과 협업하도록 하겠습니다.'
        : lang === 'en'
        ? 'We will establish partnerships with Indonesian influencers to support the marketing and sales of both Korean and Indonesian products. We will also provide support for Korean influencers activities in Indonesia and collaborate with Korean influencers to help Indonesian products gain greater recognition and achieve stronger sales opportunities in the Korean market.'
        : 'Kami akan menjalin kemitraan dengan influencer Indonesia untuk membantu pemasaran dan penjualan produk Korea maupun produk Indonesia. Kami juga akan membantu aktivitas influencer Korea di Indonesia, serta bekerja sama dengan influencer Korea agar produk-produk Indonesia dapat lebih dikenal dan memiliki peluang penjualan yang lebih besar di pasar Korea.',
    };
  }

  return {
    title: service.title,
    subtitle: service.subtitle || '',
    description: service.description || '',
  };
}

export default function ServicesSection({ dynamicServices }: { dynamicServices: Service[] }) {
  const [activeGallery, setActiveGallery] = useState<{ title: string; images: string[]; activeIdx: number } | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const { lang } = useLanguage();
  const text = t[lang].services;
  const serviceItems = (t[lang] as any).serviceItems || {};

  const getServiceData = (service: Service) => {
    const lower = service.title.toLowerCase();
    let item: any = null;
    if (lower.includes('pocketdrop')) item = serviceItems.pocketdrop;
    else if (lower.includes('pic2go')) item = serviceItems.pic2go;
    else if (lower.includes('konser') || lower.includes('concert')) item = serviceItems.concert;
    else if (lower.includes('iklan') || lower.includes('model') || lower.includes('advertising')) item = serviceItems.agency;
    else if (lower.includes('penghubung') || lower.includes('bridge') || lower.includes('perusahaan')) item = serviceItems.bridge;
    else if (lower.includes('influencer')) item = serviceItems.influencer;

    return {
      category: item?.category || service.category,
      title: item?.title || service.title,
      subtitle: item?.subtitle || service.subtitle,
      description: item?.description || service.description,
    };
  };

  // Helper to select icon based on title/category
  const getIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('pocketdrop') || lower.includes('aplikasi') || lower.includes('photocard')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('pic2go') || lower.includes('kiosk') || lower.includes('printer')) return <Printer className="w-6 h-6" />;
    if (lower.includes('konser') || lower.includes('fanmeeting') || lower.includes('ticket')) return <Ticket className="w-6 h-6" />;
    if (lower.includes('iklan') || lower.includes('model')) return <Megaphone className="w-6 h-6" />;
    if (lower.includes('penghubung') || lower.includes('perusahaan')) return <Globe className="w-6 h-6" />;
    if (lower.includes('influencer')) return <Users className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  // Separate services with photos (Featured) from services without photos
  const featuredServices = dynamicServices.filter(s => s.images && s.images.length > 0);
  const standardServices = dynamicServices.filter(s => !s.images || s.images.length === 0);

  // Maximum 3 rows limit initially
  // Featured services = 1 row each (2 featured services = 2 rows)
  // Standard services = 3 items per row (3 standard services = 1 row)
  const INITIAL_FEATURED_LIMIT = 2;
  const INITIAL_STANDARD_LIMIT = 3;

  const visibleFeatured = showAllServices ? featuredServices : featuredServices.slice(0, INITIAL_FEATURED_LIMIT);
  const visibleStandard = showAllServices ? standardServices : standardServices.slice(0, INITIAL_STANDARD_LIMIT);

  const hasMoreServices = featuredServices.length > INITIAL_FEATURED_LIMIT || standardServices.length > INITIAL_STANDARD_LIMIT;

  const showMoreLabel =
    lang === 'ko'
      ? '서비스 더보기'
      : lang === 'en'
      ? 'Show More Services'
      : 'Lihat Lebih Banyak Service';

  const showLessLabel =
    lang === 'ko'
      ? '접기'
      : lang === 'en'
      ? 'Show Less'
      : 'Tampilkan Lebih Sedikit';

  return (
    <section id="services" className="py-24 md:py-32 border-t border-[#607D94]/15 bg-[#F4F9FC] text-[#102B3F] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#102B3F]">{text.title}</h2>
          <p className="max-w-3xl text-base md:text-lg font-normal leading-relaxed text-[#607D94] text-justify">
            {text.desc}
          </p>
        </div>

        <div className="space-y-12">
          {/* FEATURED SERVICES WITH PHOTOS (Highlight Full-Width 1 Row Card) */}
          {visibleFeatured.map((service) => {
            const loc = getLocalizedServiceContent(service, lang);
            return (
              <div
                key={service.id}
                className="rounded-3xl p-6 md:p-10 shadow-xl shadow-[#1A7B9B]/5 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#607D94]/20 bg-white hover:border-[#3BBBE2] hover:shadow-2xl transition-all duration-300"
              >
                {/* Subtle Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-[#3BBBE2]/10" />

                {/* Left Column: Service Details */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl border border-[#3BBBE2]/30 bg-[#3BBBE2]/10 text-[#1A7B9B] flex items-center justify-center shadow-inner">
                        {getIcon(service.title)}
                      </div>
                      <span className="px-3 py-1 border border-[#1A7B9B]/20 bg-[#F4F9FC] rounded-full text-xs font-semibold uppercase tracking-wider text-[#1A7B9B]">
                        {loc.category || service.category}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight text-[#102B3F]">
                      {loc.title}
                    </h3>

                    {loc.subtitle && (
                      <p className="text-sm font-mono mb-4 text-[#1A7B9B] font-medium">
                        {loc.subtitle}
                      </p>
                    )}

                    {loc.description && (
                      <p className="text-sm md:text-base font-normal leading-relaxed whitespace-pre-line text-[#607D94] text-justify">
                        {loc.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Featured Image Single 1-by-1 Auto Carousel */}
                <div className="lg:col-span-6 w-full">
                  <ServiceCarousel
                    title={loc.title}
                    images={service.images}
                    previewTitle={text.previewTitle}
                    imageUnit={text.imageUnit}
                    onOpenLightbox={(idx) => setActiveGallery({ title: loc.title, images: service.images, activeIdx: idx })}
                  />
                </div>
              </div>
            );
          })}

          {/* STANDARD SERVICES GRID (Services without photos) */}
          {visibleStandard.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {visibleStandard.map((service) => {
                const loc = getLocalizedServiceContent(service, lang);
                return (
                  <div
                    key={service.id}
                    className="border border-[#607D94]/20 bg-white p-8 rounded-2xl flex flex-col justify-between hover-lift transition-all duration-300 shadow-sm hover:border-[#3BBBE2]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#3BBBE2]/10 text-[#1A7B9B] flex items-center justify-center mb-6 border border-[#3BBBE2]/20">
                        {getIcon(service.title)}
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-widest block mb-2 text-[#1A7B9B] font-semibold">
                        {loc.category || service.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 text-[#102B3F]">{loc.title}</h3>
                      {loc.subtitle && (
                        <p className="text-xs font-mono mb-4 text-[#607D94]">{loc.subtitle}</p>
                      )}
                      {loc.description && (
                        <p className="text-sm font-normal leading-relaxed whitespace-pre-line text-[#607D94] text-justify">
                          {loc.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More Services Button */}
          {hasMoreServices && (
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-white border border-[#607D94]/20 text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-md cursor-pointer group"
              >
                <span>{showAllServices ? showLessLabel : showMoreLabel}</span>
                {showAllServices ? (
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Service Photos / App Screenshots */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B3F]/80 backdrop-blur-xl p-4 md:p-8">
          <button
            onClick={() => setActiveGallery(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#3BBBE2] transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-[#102B3F] border border-[#3BBBE2]/30 rounded-3xl p-6 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{activeGallery.title}</h3>

            <div className="relative w-full h-[65vh] flex items-center justify-center bg-[#091B28] rounded-2xl overflow-hidden p-2">
              <Image
                src={activeGallery.images[activeGallery.activeIdx]}
                alt="App Screenshot"
                fill
                sizes="900px"
                className="object-contain"
              />
            </div>

            {/* Carousel Navigation */}
            {activeGallery.images.length > 1 && (
              <div className="flex items-center justify-between w-full mt-4 px-4">
                <button
                  onClick={() =>
                    setActiveGallery((prev) =>
                      prev
                        ? {
                          ...prev,
                          activeIdx: (prev.activeIdx - 1 + prev.images.length) % prev.images.length,
                        }
                        : null
                    )
                  }
                  className="p-2.5 rounded-full bg-[#3BBBE2]/20 text-white hover:bg-[#3BBBE2] transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <span className="text-xs text-[#3BBBE2] font-mono">
                  {activeGallery.activeIdx + 1} / {activeGallery.images.length}
                </span>

                <button
                  onClick={() =>
                    setActiveGallery((prev) =>
                      prev
                        ? {
                          ...prev,
                          activeIdx: (prev.activeIdx + 1) % prev.images.length,
                        }
                        : null
                    )
                  }
                  className="p-2.5 rounded-full bg-[#3BBBE2]/20 text-white hover:bg-[#3BBBE2] transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

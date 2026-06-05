import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Roadmap() {
  return (
    <SectionWrapper id="roadmap" className="py-6 md:py-12">
      {/* Founder Story */}
      <section className="py-6 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-low w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-5 h-[200px] md:h-[400px] md:h-auto glass-panel rounded-xl overflow-hidden relative">
            <img alt="Founders working" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMf8gQmVihBjKNVvEPoK-QIoQLvvN7d9_eTD5A3tMrAxvO98k2jB6nMGZHnwlmsqqw34Nw27Pkxq8FS7Z4VQtpyeoXkWAkrWfR69XqBOwbJaHPtoOW11wOl6ZIeRpSOUJqDqTQxs2YSvHn5EEmjQ8voCMRhzzFs_Vngbmm-Rh0ODEUVABvZjvPcUvCRQCC-rMMu08unClBqztjjqVxiou-ajLg6a2blNRo7PMxmKL-uzveeW7qHsnydkK0aINh3XW0bbzr_loPUZY"/>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center space-y-3 md:space-y-6 md:pl-12 py-4 md:py-8">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest text-[11px] md:text-sm">Why We Started</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Bridging the gap between raw potential and institutional capital.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm md:text-base">
              We observed a rapidly maturing creator economy struggling with antiquated transaction infrastructure. Professional creators lacked a dedicated, secure venue to realize the true enterprise value of their intellectual property. We built this marketplace to act as that critical, trusted intermediary—bringing high-end financial terminal precision to digital asset sales.
            </p>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

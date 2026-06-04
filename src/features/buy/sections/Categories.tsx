import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Categories() {
  return (
    <SectionWrapper id="categories" className="py-12">
      <section className="flex flex-col gap-8">
        <h2 className="font-headline-md text-on-surface">Explore by Platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Category Cards */}
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">photo_camera</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">Instagram</span>
          </a>
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">smart_display</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">YouTube</span>
          </a>
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">send</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">Telegram</span>
          </a>
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">chat_bubble</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">ShareChat</span>
          </a>
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">chat</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">WhatsApp</span>
          </a>
          <a className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-container transition-colors group" href="#">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">language</span>
            <span className="font-label-md text-on-surface uppercase tracking-wider">Websites</span>
          </a>
        </div>
      </section>
    </SectionWrapper>
  );
}

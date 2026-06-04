import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Benefits() {
  return (
    <SectionWrapper id="benefits" className="py-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border-subtle">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-border-subtle">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <h3 className="font-body-lg text-on-surface font-semibold">Verified Listings</h3>
          <p className="font-body-md text-on-surface-variant">Every asset undergoes rigorous financial and operational auditing to ensure authenticity and mitigate buyer risk.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-border-subtle">
            <span className="material-symbols-outlined text-primary">monitoring</span>
          </div>
          <h3 className="font-body-lg text-on-surface font-semibold">Audience Analysis</h3>
          <p className="font-body-md text-on-surface-variant">Gain deep insights into audience demographics, engagement rates, and geographic distribution before making an offer.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-border-subtle">
            <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
          </div>
          <h3 className="font-body-lg text-on-surface font-semibold">Growth Potential</h3>
          <p className="font-body-md text-on-surface-variant">Identify undervalued assets with scalable frameworks and untapped monetization avenues tailored for enterprise growth.</p>
        </div>
      </section>
    </SectionWrapper>
  );
}

const fs = require('fs');
const path = require('path');

const features = {
  home: ['Hero', 'Categories', 'FeaturedOpportunities', 'HowItWorks', 'Trust', 'MarketplaceStats', 'FinalCTA'],
  valuation: ['Hero', 'Calculator', 'SampleReport', 'LeadForm', 'FAQ'],
  sell: ['Hero', 'Benefits', 'Process', 'SubmissionForm', 'FAQ'],
  buy: ['Hero', 'Categories', 'FeaturedAssets', 'Benefits', 'BuyerForm'],
  about: ['Mission', 'Vision', 'Principles', 'Roadmap'],
  resources: ['Hero', 'CategoryFilter', 'ResourceCards', 'NewsletterCTA']
};

const futureModules = [
  'marketplace', 'authentication', 'dashboard', 'escrow', 
  'verification', 'admin', 'transactions'
];

// Create feature sections
Object.entries(features).forEach(([feature, sections]) => {
  const dir = path.join(__dirname, 'src', 'features', feature, 'sections');
  fs.mkdirSync(dir, { recursive: true });
  
  sections.forEach(section => {
    const filePath = path.join(dir, `${section}.tsx`);
    const content = `import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function ${section}() {
  return (
    <SectionWrapper id="${section.toLowerCase()}" className="py-12">
      {/* STITCH HTML */}
      <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
        Paste ${section} Stitch HTML here
      </div>
    </SectionWrapper>
  );
}
`;
    fs.writeFileSync(filePath, content);
  });
});

// Create future modules
futureModules.forEach(module => {
  const dir = path.join(__dirname, 'src', 'features', module);
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `# ${module.charAt(0).toUpperCase() + module.slice(1)} Module\n\nThis directory is prepared for future scalability of the ${module} features.`;
  fs.writeFileSync(path.join(dir, '_README.md'), content);
});

console.log('Sections and future modules generated successfully.');

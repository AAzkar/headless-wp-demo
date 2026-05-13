import HeroBlock from '@/components/blocks/HeroBlock';
import FeaturesGridBlock from '@/components/blocks/FeaturesGridBlock';
import TestimonialsBlock from '@/components/blocks/TestimonialsBlock';
import CoreBlockRenderer from '@/components/CoreBlockRenderer';
import FAQBlock from '@/components/blocks/FAQBlock';
import PricingBlock from '@/components/blocks/PricingBlock';

const blockMap = {
  'acf/hero': HeroBlock,
  'acf/features-grid': FeaturesGridBlock,
  'acf/testimonials': TestimonialsBlock,
  'acf/faq': FAQBlock,
  'acf/pricing': PricingBlock,
};

export default function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const data = block.attributes?.data || {};
        const BlockComponent = blockMap[block.name];

        if (BlockComponent) {
          return <BlockComponent key={index} data={data} />;
        }

        return <CoreBlockRenderer key={index} block={block} />;
      })}
    </>
  );
}
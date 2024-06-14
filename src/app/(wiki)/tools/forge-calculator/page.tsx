import EmojiCarousel from '@/src/components/decoration/carouseul';
import ForgeCalculatorContainer from '@/src/components/wiki/forge-calculator/container';
import { detectLanguage, useServerTranslation } from '@/src/lib/i18n';

import '@/src/styles/Text-Animation.scss';

export default async function ForgeCalculator() {
  const { t } = await useServerTranslation();
  const language = await detectLanguage();

  return (
    <div className='flex h-full w-full flex-col items-center'>
      <div className='relative mt-12 flex h-40 w-full flex-col items-center justify-center px-4'>
        <h2 className='__className_d6dd13 text-animation z-10 text-5xl md:text-6xl'>{t('forgeCalculator.title')}</h2>
        <span className='z-10'>{t('forgeCalculator.descriptiom')}</span>
        <div className='z-1 absolute flex h-40 w-full flex-col items-center justify-center' style={{ opacity: 0.2 }}>
          <EmojiCarousel />
        </div>
      </div>
      <div className='mt-8 min-h-[40rem] w-[90vw] max-w-full items-center justify-center rounded-md bg-primary/10'>
        <ForgeCalculatorContainer lng={language} />
      </div>
    </div>
  );
}

import { cn } from '@/src/lib/utils';

import '@/src/styles/Card-Shine.css';

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn('grid-cols-1ag mx-auto grid max-w-7xl gap-4 md:auto-rows-[18rem] md:grid-cols-3 ', className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  children,
  className,
  title,
  description,
  header,
  icon,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento relative row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent',
        className
      )}
    >
      {header}
      <div className='transition duration-200 group-hover/bento:translate-x-2'>
        {children ? (
          <>{children}</>
        ) : (
          <>
            {icon}
            <div className='mb-2 mt-2 line-clamp-1 font-sans font-bold text-neutral-600 dark:text-neutral-200'>
              {title}
            </div>
            <div className='line-clamp-3 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300'>
              {description}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const BlogPostSkeleton = () => {
  return (
    <div
      className={
        'card-shine-effect-2 relative flex w-full flex-col rounded-xl border border-transparent bg-card shadow-input brightness-[150%]'
      }
    >
      <div className='flex flex-row items-center transition duration-200'>
        <div className='absolute left-0 top-0 h-full w-[14rem] rounded-md bg-primary/10' />
        <div className='ml-60 flex w-full flex-col py-2 pr-4'>
          <div className='mb-2 mt-2 line-clamp-1 h-4 w-full rounded-md bg-primary/[15%] font-sans font-bold text-neutral-600 dark:text-neutral-200' />
          <div className='line-clamp-3 h-12 rounded-md bg-primary/10 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300' />
        </div>
      </div>
    </div>
  );
};

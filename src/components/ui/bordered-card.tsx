import Halo from '@/src/components/ui/halo';
import { cn } from '@/src/lib/utils';

export default function Card({
  children,
  className,
  disableHalo,
  noPadding,
}: {
  children: React.ReactNode;
  className: string;
  disableHalo?: boolean;
  noPadding?: boolean;
}) {
  return (
    <Halo
      strength={disableHalo ? 0 : 5}
      className={cn(
        'h-full w-full overflow-clip rounded-xl border border-stone-800 bg-stone-900 text-sm',
        noPadding ? 'p-0' : 'p-4 md:p-6',
        className,
      )}
    >
      {children}
    </Halo>
  );
}

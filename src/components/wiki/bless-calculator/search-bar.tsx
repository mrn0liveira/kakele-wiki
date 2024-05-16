import { AutoComplete, type Option } from './dropdown';

import kakeleItems from '@/src/lib/kakele/items.js';

interface ComponentProps {
  setValue: (value: Option) => void;
  value: Option | undefined;
  isDisabled: boolean;
  emptyMessage: string;
  placeholder: string;
  language: string;
}

export default function SearchBar({
  setValue,
  value,
  isDisabled,
  emptyMessage,
  placeholder,
  language,
}: ComponentProps) {
  return (
    <AutoComplete
      disabled={isDisabled}
      emptyMessage={emptyMessage}
      onValueChange={setValue}
      options={kakeleItems
        .filter((x: { type: string }) => x.type !== 'Others' && x.type !== 'Food')
        .map((x: any) => {
          return {
            value: x.name.toLowerCase(),
            label: x[`language.${language}`],
            id: x.id,
          };
        })}
      placeholder={placeholder}
      value={value}
    />
  );
}

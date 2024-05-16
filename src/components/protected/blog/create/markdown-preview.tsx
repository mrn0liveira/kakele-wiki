import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

// import "highlight.js/styles/atom-one-dark.min.css";
import { PiTerminalThin } from 'react-icons/pi';

import { cn } from '@/src/lib/utils';

import { icons } from '@/src/lib/icons';

export default function MarkdownPreview({ content, className = 'sm:p-10' }: { content: string; className?: string }) {
  return (
    <Markdown
      className={cn('no-scrollbar space-y-8 dark:text-gray-200', className)}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className='text-3xl font-bold' />;
        },
        h2: ({ node, ...props }) => {
          return <h1 {...props} className='mb-10 mt-10 text-2xl font-bold' />;
        },
        h3: ({ node, ...props }) => {
          return <h1 {...props} className='mb-10 mt-10 text-xl font-bold' />;
        },
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const id = (Math.floor(Math.random() * 100) + 1).toString();

          if (match?.length) {
            let Icon = PiTerminalThin;
            const isMatch = icons.hasOwnProperty(match[1]);
            if (isMatch) {
              Icon = icons[match[1] as keyof typeof icons];
            }

            return (
              <div className=' bg-graident-dark rounded-md border-[0.5px] border-zinc-500 text-gray-300'>
                <div className='flex items-center justify-between border-b-[0.5px] border-zinc-500 px-5 py-2'>
                  <div className='flex items-center gap-2'>
                    <Icon />
                    <p className='text-sm text-gray-400'>
                      {/* @ts-ignore  */}
                      {node?.data?.meta}
                    </p>
                  </div>
                  <div>Copy</div>
                </div>
                <div className='w-full overflow-x-auto'>
                  <div className='p-5' id={id}>
                    {children}
                  </div>
                </div>
              </div>
            );
          }
          return (
            // TODO: convert to code block
            <code className='break-words rounded-sm bg-zinc-700 px-1 text-lg' {...props}>
              {children}
            </code>
          );
        },
      }}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </Markdown>
  );
}

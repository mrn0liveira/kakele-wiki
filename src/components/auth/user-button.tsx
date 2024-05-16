'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import { FaUser } from 'react-icons/fa';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { LogoutButton } from '@/src/components/auth/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';

import { useCurrentUser } from '@/src/hooks/use-current-user';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>?
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-sky-500'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

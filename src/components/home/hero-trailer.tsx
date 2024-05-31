'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ComponentProps {
  ad: string;
  mobileAd: string;
  subhead: string;
}

export default function HeroTrailer({ ad, mobileAd, subhead }: ComponentProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className='relaive flex h-screen max-h-[800px] max-w-[1400px] flex-col items-center justify-start'
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* <video
				autoPlay
				className="absolute top-0 h-full max-h-[800px] w-full max-w-[1400px] overflow-hidden object-cover"
				loop
				muted
			>
				<source src="/img/home/en_TRAILER.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video> */}
      <Image
        src={'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1716562658/kakele-wiki/background/bp4ccagntursoolkhkzi.png'}
        alt='Kakele Background'
        className='absolute top-0 h-full max-h-[800px] w-full max-w-[1400px] object-cover'
        height={800}
        width={1400}
      />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='absolute top-0 h-full max-h-[800px] w-full max-w-[1400px] bg-gradient-to-b from-black to-transparent object-cover'
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className='absolute bottom-12 z-10 flex w-full flex-row items-center justify-center gap-4 space-y-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
          <motion.div
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            initial={{ opacity: 0, y: 30, rotate: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              alt='Kakele Dragon'
              className='h-60 w-60'
              height={200}
              src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882710/kakele-wiki/pages/home/dragon.png'
              width={200}
            />
          </motion.div>
          <div className='absolute bottom-0 mt-8 flex h-auto flex-col items-center'>
            <div className='__className_d6dd13 space-y-0 text-nowrap text-[3rem] text-white drop-shadow-lg md:text-[3rem]'>
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className='text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                initial={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Kakele
              </motion.span>{' '}
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className='text-orange-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                initial={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Wiki
              </motion.span>
            </div>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className='md:text-md absolute bottom-0 text-nowrap text-xs text-white'
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {subhead}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <div
        className='absolute top-0 h-full max-h-[800px] w-full max-w-[1400px] object-cover'
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(20, 17, 15, 1) 100%)',
        }}
      />
    </motion.div>
  );
}

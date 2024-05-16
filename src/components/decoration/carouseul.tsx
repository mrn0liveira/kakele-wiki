'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import styles from '@/src/styles/blur.module.css';
import '@/src/styles/InfiniteCarrouseul.scss';

export default function EmojiCarousel() {
  const emojis = Array(31).fill('');

  return (
    <div className={`carousel-container unselectable h-24 w-full ${styles.container}`}>
      <div>
        <motion.div animate='open' className='carousel-track'>
          <motion.ul
            className='flex flex-row gap-2'
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            whileInView={wrapperVariants.open}
          >
            {emojis.map((item, index) => (
              <motion.li
                className='h-16 w-16'
                initial={itemVariants.closed}
                key={index > 16 ? index - 16 : index}
                variants={itemVariants}
                whileInView={itemVariants.open}
              >
                <Image
                  alt={'Carousel Image'}
                  height={128}
                  quality={100}
                  src={`https://res.cloudinary.com/dl3asnoii/image/upload/v1709232096/kakele.com.br/emojis/${
                    index + 1 > 16 ? index - 16 + 1 : index + 1
                  }.png`}
                  width={128}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -200,
    transition: {
      when: 'afterChildren',
    },
  },
};

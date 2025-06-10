'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface CreativeItemProps {
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  href?: string;
}

const CreativeCard = () => {
  const { theme } = useTheme();
  
  const creativeItems: CreativeItemProps[] = [
    {
      title: 'Design',
      imageUrl: '/assets/images/design.jpg',
      description: 'Digital and graphic design portfolio',
      category: 'Design',
      href: '/creative/designs'
    },
    {
      title: 'Quotes',
      imageUrl: '/assets/images/quote.png',
      description: 'Inspirational and thought-provoking quotes',
      category: 'Writing',
      href: '/creative/quotes'
    },
    {
      title: 'Essays & Articles',
      imageUrl: '/assets/images/essays.jpg',
      description: 'Thought-provoking essays and articles',
      category: 'Writing',
      href: '/creative/essays'
    },
    {
      title: 'Videos',
      imageUrl: '/assets/images/video.png',
      description: 'Creative video content and animations',
      category: 'Media',
      href: '/creative/videos'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creativeItems.map((item, index) => (
        <motion.div
          key={item.title}
          className="relative group cursor-pointer overflow-hidden rounded-xl bg-[var(--card-background)] shadow-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.href ? (
            <Link href={item.href} className="block h-full">
              <div className="relative h-36 sm:h-48 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-30 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-moranga mb-1" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] mb-2">{item.description}</p>
                <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[var(--foreground)]/10 rounded-full text-xs font-silka-medium text-[var(--foreground)]">
                  {item.category}
                </span>
              </div>
            </Link>
          ) : (
            <>
              <div className="relative h-36 sm:h-48 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-30 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-moranga mb-1" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] mb-2">{item.description}</p>
                <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[var(--foreground)]/10 rounded-full text-xs font-silka-medium text-[var(--foreground)]">
                  {item.category}
                </span>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CreativeCard;
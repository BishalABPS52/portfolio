'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getResponsiveImageSizes } from '@/lib/ResponsiveUtils';

const CertificatesCard = () => {
  const { theme } = useTheme();
  
  const certificates = [
    { src: '/assets/certificates/c1.png', alt: 'Googling Competition' },
    { src: '/assets/certificates/c2.jpg', alt: 'CCRC Scientic Circle Member' },
    { src: '/assets/certificates/c3.jpg', alt: 'Math Quiz Competition' },
    { src: '/assets/certificates/c4.jpg', alt: 'Online Global Quiz Competition' },
    { src: '/assets/certificates/c5.jpeg', alt: 'Bits & Bytes Quiz Competition' },
    { src: '/assets/certificates/c6.jpeg', alt: 'Sololearn "Introduction To C"' },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.src}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-2xl overflow-hidden border-[3px] border-[#003049] shadow-lg"
          style={{ background: theme === 'dark' ? '#1c2128' : '#f8f9fa' }}
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-105 transition-transform duration-300"
              sizes={getResponsiveImageSizes('gallery')}
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-moranga truncate" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
              {cert.alt}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificatesCard;

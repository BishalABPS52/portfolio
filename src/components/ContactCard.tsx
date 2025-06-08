'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreenSize } from '@/lib/ResponsiveUtils';

const ContactCard = () => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();

  const contactInfo = [
    {
      icon: <FontAwesomeIcon icon={faFacebookF} className="text-[#1877F2] text-xl" />, 
      label: 'Facebook', 
      value: 'Bishal Shrestha', 
      link: 'https://www.facebook.com/profile.php?id=100067072687802'
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} className="text-[#E4405F] text-xl" />, 
      label: 'Instagram', 
      value: '@bs52.py', 
      link: 'https://www.instagram.com/bs52.py'
    },
    {
      icon: <FontAwesomeIcon icon={faLinkedinIn} className="text-[#0077B5] text-xl" />, 
      label: 'LinkedIn', 
      value: 'Bishal Shrestha', 
      link: 'https://www.linkedin.com/in/bishal-shrestha-2b05b1302/'
    },
    {
      icon: <FontAwesomeIcon icon={faDiscord} className="text-[#7289DA] text-xl" />, 
      label: 'Discord', 
      value: '_bishalshrestha52', 
      link: 'https://discord.gg/_bishalshrestha52'
    },
    {
      icon: <FontAwesomeIcon icon={faYoutube} className="text-[#7289DA] text-xl" />, 
      label: 'YouTube', 
      value: 'AI Aether', 
      link: 'https://www.youtube.com/@ai_aether_ai'
    },
    {
      icon: <Mail size={18} className="text-black" />, 
      label: 'Email', 
      value: 'bs426808@gmail.com', 
      link: 'mailto:bs426808@gmail.com'
    },
    {
      icon: <Phone size={18} className="text-black" />, 
      label: 'Phone', 
      value: '+977-9765532314', 
      link: 'tel:+9779765532314'
    },
    {
      icon: <MapPin size={18} className="text-black" />, 
      label: 'Location', 
      value: 'Kathmandu, Nepal', 
      link: 'https://maps.google.com/?q=Kathmandu,Nepal'
    }
  ];

  return (
    <div
      className="rounded-3xl p-4 sm:p-6 h-full relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300"
      style={{ background: theme === 'dark' ? '#1c2128' : '#f9f7f3' }}
    >
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-moranga text-[#0D1117] mb-1 sm:mb-2">Let's Connect</h3>
          <p className="freelance-availability font-silka text-xs sm:text-sm">
            Available for freelance work and collaborations
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center rounded-2xl p-2 sm:p-4 transition-all duration-300 corner-link touch-target"
              style={{ 
                backgroundColor: theme === 'dark' ? '#0b1d2a' : '#d9d9d9',
              }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1 sm:mb-2"
                   style={{ 
                     backgroundColor: theme === 'dark' ? '#0b1d2a' : '#d9d9d9',
                   }}>
                {item.icon}
              </div>
              <div className="font-silka-medium text-xs sm:text-sm" style={{ color: theme === 'dark' ? '#f8f9fa' : '#0D1117' }}>
                {item.label}
              </div>
              {!isMobile && (
                <div className="font-silka text-[10px] sm:text-xs truncate max-w-full" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                  {item.value}
                </div>
              )}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 sm:mt-6">
          <a
            href="mailto:bs426808@gmail.com?subject=Let's work together!"
            className="w-full bg-[#0D1117] text-white rounded-2xl p-3 sm:p-4 flex items-center justify-center font-silka-medium text-xs sm:text-sm hover:bg-[#2a2a2a] transition-colors duration-300 touch-target"
          >
            Send me an email 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

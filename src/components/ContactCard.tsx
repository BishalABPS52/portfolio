'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreenSize } from '@/lib/ResponsiveUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ContactCard = () => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const contactInfo = [
    {
      icon: <FontAwesomeIcon icon={faFacebookF} className="text-[#1877F2] text-xl" />, 
      label: 'Facebook', 
      value: 'Bishal Shrestha', 
      link: 'https://www.facebook.com/profile.php?id=100067072687802',
      color: '#1877F2',
      bgGradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} className="text-[#E4405F] text-xl" />, 
      label: 'Instagram', 
      value: '@bs52.py', 
      link: 'https://www.instagram.com/bs52.py',
      color: '#E4405F',
      bgGradient: 'from-pink-500/20 to-purple-500/20'
    },
    {
      icon: <FontAwesomeIcon icon={faLinkedinIn} className="text-[#0077B5] text-xl" />, 
      label: 'LinkedIn', 
      value: 'Bishal Shrestha', 
      link: 'https://www.linkedin.com/in/bishal-shrestha-2b05b1302/',
      color: '#0077B5',
      bgGradient: 'from-blue-600/20 to-blue-700/20'
    },
    {
      icon: <FontAwesomeIcon icon={faDiscord} className="text-[#7289DA] text-xl" />, 
      label: 'Discord', 
      value: '_bishalshrestha52', 
      link: 'https://discord.gg/_bishalshrestha52',
      color: '#7289DA',
      bgGradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      icon: <FontAwesomeIcon icon={faYoutube} className="text-[#FF0000] text-xl" />, 
      label: 'YouTube', 
      value: 'AI Aether', 
      link: 'https://www.youtube.com/@ai_aether_ai',
      color: '#FF0000',
      bgGradient: 'from-red-500/20 to-red-600/20'
    },
    {
      icon: <Mail size={18} className="text-[#34D399]" />, 
      label: 'Email', 
      value: 'bs426808@gmail.com', 
      link: 'mailto:bs426808@gmail.com',
      color: '#34D399',
      bgGradient: 'from-green-400/20 to-emerald-500/20'
    },
    {
      icon: <Phone size={18} className="text-[#60A5FA]" />, 
      label: 'Phone', 
      value: '+977-9765532314', 
      link: 'tel:+9779765532314',
      color: '#60A5FA',
      bgGradient: 'from-blue-400/20 to-cyan-500/20'
    },
    {
      icon: <MapPin size={18} className="text-[#F87171]" />, 
      label: 'Location', 
      value: 'Kathmandu, Nepal', 
      link: 'https://maps.google.com/?q=Kathmandu,Nepal',
      color: '#F87171',
      bgGradient: 'from-red-400/20 to-pink-500/20'
    }
  ];
  return (
    <motion.div
      className="rounded-3xl p-4 sm:p-6 h-full relative overflow-hidden grid-item border-[3px] transition-all duration-500"
      style={{ 
        background: theme === 'dark' ? '#1c2128' : '#f9f7f3',
        borderColor: theme === 'dark' ? '#780000' : '#003049'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: theme === 'dark' 
          ? '0 20px 40px rgba(120, 0, 0, 0.3)' 
          : '0 20px 40px rgba(0, 48, 73, 0.15)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Floating particles */}
        <motion.div 
          className="absolute top-4 left-6 w-2 h-2 bg-gradient-to-r from-[#780000] to-[#c1121f] rounded-full"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-12 right-8 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 5, 0],
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-16 left-4 w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4] 
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Gradient overlay */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${
            theme === 'dark' 
              ? 'from-[#780000]/10 via-transparent to-purple-500/5' 
              : 'from-[#003049]/5 via-transparent to-blue-400/10'
          } rounded-3xl`}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Animation */}
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >          <motion.div className="flex items-center gap-2 mb-2">
            <motion.h3 
              className={`text-xl sm:text-2xl font-moranga ${
                theme === 'dark' ? 'text-white' : 'text-[#0D1117]'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Let's Connect
            </motion.h3>
          </motion.div>
          <motion.p 
            className={`freelance-availability font-silka text-xs sm:text-sm flex items-center gap-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles size={14} className="text-[#780000]" />
            Available for freelance work and collaborations
          </motion.p>
        </motion.div>        {/* Social Media Links with Enhanced Animations */}
        <motion.div 
          className="mt-4 sm:mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-2xl p-2 sm:p-4 transition-all duration-300 corner-link touch-target relative overflow-hidden"
              style={{ 
                backgroundColor: theme === 'dark' ? '#0b1d2a' : '#d9d9d9',
              }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                boxShadow: `0 10px 25px ${item.color}40`
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100`}
                initial={{ scale: 0 }}
                animate={{ scale: activeCard === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={activeCard === index ? { translateX: '200%' } : {}}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div 
                className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1 sm:mb-2"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#0b1d2a' : '#d9d9d9',
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              
              <div 
                className="relative z-10 font-silka-medium text-xs sm:text-sm" 
                style={{ color: theme === 'dark' ? '#f8f9fa' : '#0D1117' }}
              >
                {item.label}
              </div>
              
              {!isMobile && (
                <motion.div 
                  className="relative z-10 font-silka text-[10px] sm:text-xs truncate max-w-full" 
                  style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.value}
                </motion.div>
              )}
              
              {/* Floating icon on hover */}
              <AnimatePresence>
                {activeCard === index && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles size={10} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </motion.div>        {/* Enhanced CTA Button */}
        <motion.div 
          className="mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="mailto:bs426808@gmail.com?subject=Let's work together!"
            className={`group w-full relative overflow-hidden ${
              theme === 'light' ? 'bg-[#780000]' : 'bg-gradient-to-r from-[#780000] to-[#c1121f]'
            } text-white rounded-2xl p-3 sm:p-4 flex items-center justify-center font-silka-medium text-xs sm:text-sm transition-all duration-300 touch-target`}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: theme === 'dark' 
                ? '0 15px 30px rgba(120, 0, 0, 0.4)' 
                : '0 15px 30px rgba(120, 0, 0, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#c1121f] to-[#780000]"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full"
              transition={{ duration: 0.6 }}
            />            {/* Button content */}
            <motion.span 
              className="relative z-10 flex items-center gap-2"
              whileHover={{ y: -1 }}
            >
              Send me an email
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Corner decorations */}
      <motion.div 
        className="absolute top-2 right-2 w-16 h-16 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className={`w-full h-full border-2 border-dashed rounded-full ${
          theme === 'dark' ? 'border-[#780000]' : 'border-[#003049]'
        }`} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-2 left-2 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className={`w-full h-full border-2 border-dotted rounded-lg ${
          theme === 'dark' ? 'border-purple-500' : 'border-blue-400'
        }`} />
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;

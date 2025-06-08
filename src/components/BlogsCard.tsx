'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getResponsiveImageSizes } from '@/lib/ResponsiveUtils';

const blogPosts = [
	{
		title: 'Building My Portfolio: A Journey in Modern Web Development',
		description:
			'An in-depth look at the design decisions, technologies, and learning experiences while creating this portfolio website.',
		imageUrl: '/assets/blogs/portfolio.png',
		href: '/blogs/portfolio-journey',
		category: 'Web Development',
	},
	{
		title: 'Life as a Computer Engineering Student at IOE Thapathali',
		description:
			'My experiences, challenges, and growth as a computer engineering student at the Institute of Engineering, Thapathali Campus.',
		imageUrl: '/assets/blogs/ioe.png',
		href: '/blogs/ioe-journey',
		category: 'Education',
	},
];

const BlogsCard = () => {
	const { theme } = useTheme();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
			{blogPosts.map((post) => (
				<motion.div
					key={post.title}
					className="rounded-2xl overflow-hidden group/card bg-[var(--card-background)] border-[3px] border-[#003049] relative"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Link href={post.href} className="block h-full">
						<div className="relative h-36 sm:h-48 w-full">
							<Image
								src={post.imageUrl}
								alt={post.title}
								fill
								className="object-cover"
								sizes={getResponsiveImageSizes('card')}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
						</div>
						<div className="p-3 sm:p-4">
							<h3
								className="text-lg sm:text-xl font-moranga mb-1 transition-colors duration-300 group-hover/card:text-[#c1121f] line-clamp-2"
								style={{
									color: theme === 'dark' ? '#c1121f' : '#780000',
								}}
							>
								{post.title}
							</h3>
							<p className="text-xs sm:text-sm text-[var(--muted)] mb-2 line-clamp-2">
								{post.description}
							</p>
							<span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[var(--foreground)]/10 rounded-full text-[10px] sm:text-xs font-silka-medium text-[var(--foreground)]">
								{post.category}
							</span>
						</div>
					</Link>
				</motion.div>
			))}
		</div>
	);
};

export default BlogsCard;

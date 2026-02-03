'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { BlurFade } from './ui/blur-fade';

const GlobalBackground = () => {
	const { scrollY } = useScroll();
	const path = usePathname();

	const blurValue = useTransform(scrollY, [0, 500], ['0px', '40px']);
	const darker = useTransform(scrollY, [0, 500], ['0%', '30%']);
	const blurFilter = useTransform(blurValue, (v) => `blur(${v})`);
	const darkerOpacity = useTransform(darker, (v) => v);



	if (path.startsWith('/project') || path.startsWith("/blog")) {
		return (

			<div className="fixed inset-0 z-[-1] w-full h-full bg-blog-bg overflow-hidden">
			</div>
		);
	}

	return (
		<div className="fixed inset-0 z-[-1] w-full h-full bg-[#0a0a0a] overflow-hidden pointer-events-none">
			<motion.div
				style={{ filter: blurFilter }}
				className="absolute inset-0 w-full h-full z-1"
			>
				<div className="absolute top-1/4 -left-30 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute -top-30 -left-30 w-[900px] h-[600px] bg-[#341D26]/40 rounded-full blur-[120px] pointer-events-none" />

				<BlurFade
					className='w-full h-full'
					inView
				>
					<div className="h-full w-full relative">
						<Image
							width={1000}
							height={1000}
							src="/dog-hero-exp1.png"
							alt="Background"
							className="absolute right-0 bottom-0 scale-105 h-full w-full object-cover"
						/>
					</div>
				</BlurFade>
			</motion.div>

			<motion.div
				style={{ opacity: darkerOpacity }}
				className="absolute inset-0 w-full h-full bg-black z-[2]"
			/>
		</div>
	);
};

export default GlobalBackground;

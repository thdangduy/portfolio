import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ProjectSmallCardProps {
	img_url: string;
	title: string;
	excerpt: string;
	date?: string | Date;
	width_class?: string;
}

const ProjectSmallCard = ({
	img_url,
	title,
	width_class,
}: ProjectSmallCardProps) => {
	return (
		<div
			className={cn(
				'relative w-full aspect-video group overflow-hidden rounded-xl bg-gradient-to-br from-muted/20 to-muted/5 border border-white/5 group-hover:border-primary/50 transition-all duration-500',
				width_class,
			)}
		>
			<div className="absolute inset-0 w-full h-full">
				<Image
					src={img_url}
					alt={title}
					fill
					className="object-cover blur-2xl scale-125 opacity-40 group-hover:opacity-60 transition-all duration-700"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

				<Image
					src={img_url}
					alt={title}
					fill
					className="object-contain p-4 transition-all duration-700 group-hover:scale-105 scale-100 group-hover:brightness-110 z-10"
				/>
			</div>

			<div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 translate-x-2 group-hover:translate-x-0">
				<div className="w-11 h-11 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-lg shadow-primary/20">
					<ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
				</div>
			</div>

			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</div>
	);
};

export default ProjectSmallCard;

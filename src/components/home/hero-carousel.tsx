"use client";

import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card, CardContent } from "@/src/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/src/components/ui/carousel";

const images = ["/img/home/1.jpg", "/img/home/2.jpg", "/img/home/3.jpg"];

export function CarouselPlugin() {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true }),
	);

	return (
		<Carousel
			className="top-[-1rem] m-0 w-[100vw] items-center justify-center"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			plugins={[plugin.current]}
			style={{
				zIndex: 0,
			}}
		>
			<CarouselContent>
				{images.map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<div className="flex h-[30rem] items-center justify-center">
								<div className="h-full w-full overflow-hidden" />
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

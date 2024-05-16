import Image from "next/image";
import React from "react";

interface ComponentProps {
	imgUrl: string;
}

export default function CarouselItem({ imgUrl }: ComponentProps) {
	return (
		<Image
			alt={"Carousel Image"}
			className="h-16 w-16"
			height={1024}
			src={imgUrl}
			width={1024}
		 />
	);
}

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/src/components/map/container"), {
	ssr: false,
});

export default function Page() {
	return <MapWithNoSSR />;
}

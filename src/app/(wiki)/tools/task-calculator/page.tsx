import EmojiCarousel from "@/src/components/decoration/carouseul";
import TaskCalculatorContainer from "@/src/components/wiki/task-calculator/container";
import { detectLanguage, useServerTranslation } from "@/src/lib/i18n";

import "@/src/styles/Text-Animation.scss";

export default async function SetCalculator() {
	const { t } = await useServerTranslation();
	const language = await detectLanguage();

	return (
		<div className="flex h-full flex-col items-center">
			<div className="relative px-4 mt-12 flex h-40 w-full flex-col items-center justify-center">
				<h2 className="__className_d6dd13 text-animation z-10 text-5xl md:text-6xl">
					{t("taskCalculator.title")}
				</h2>
				<span className="z-10">{t("taskCalculator.description")}</span>
				<div
					className="z-1 absolute flex h-40 w-full flex-col items-center justify-center"
					style={{ opacity: 0.2 }}
				>
					<EmojiCarousel />
				</div>
			</div>
			<div className="mt-8 min-h-[40rem] w-[90vw] max-w-full items-center justify-center rounded-md bg-zinc-950/70">
				<TaskCalculatorContainer lng={language} />
			</div>
		</div>
	);
}

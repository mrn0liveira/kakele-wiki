declare module "react-i18next" {
	interface CustomTypeOptions {
		defaultNS: "common";
		resources: Resources;
	}
}

declare module "i18next" {
	interface CustomTypeOptions {
		returnNull: false;
	}
}

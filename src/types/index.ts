import type commonMessages from "@/lib/i18n/locales/pt/common";
import type zodMessages from "@/lib/i18n/locales/pt/zod";

export type Resources = {
	common: typeof commonMessages;
	zod: typeof zodMessages;
};

export type KakeleEquipmentOrWeapon = KakeleEquipmentItems | KakeleWeaponItems;

export type KakeleAnyItem = KakeleEquipmentOrWeapon | KakeleItem;

export type IBlog = {
	id: string;
	title: string;
	image_url: string;
	created_at: string;
	is_premium: boolean;
	content: string;
	is_published: boolean;
};

export type IBlogDetial = {
	created_at: string;
	id: string;
	image_url: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		blog_id: string;
		content: string;
		created_at: string;
	};
} | null;

export type IBlogForm = {
	created_at: string;
	id: string;
	image_url: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		blog_id: string;
		content: string;
		created_at: string;
	};
};

export type Iuser = {
	created_at: string;
	display_name: string;
	email: string;
	id: string;
	image_url: string;
	role: string;
	stripe_customer_id: string | null;
	stripe_subscriptoin_id: string | null;
	subscription_status: boolean;
} | null;

export interface KakeleItem {
	value: number;
	sources: string;
	name: string;
	rarity: string;
	image: string;
	amount?: number;
	"language.pl": string;
	"language.pt": string;
	"language.es": string;
	"language.en": string;
	id: number;
	expensive?: boolean;
}

export interface KakeleEquipmentItems extends KakeleItem {
	level: number;
	vocation: string;
	energy: string;
	type: "Equipment";
	stats: {
		attack: number;
		magic: number;
		armor: number;
	};
	slot: string;
}

export interface KakeleTaskItem {
	type: string;
	name: string;
	target?: string;
	amount: number;
	level: number;
	gold: number;
	xp: number;
	image?: string | null;
}

export interface KakeleFoodItems extends KakeleItem {
	level: number;
	recovery: string;
	type: "Food";
}

export interface KakeleOtherItems extends KakeleItem {
	type: "Others";
}

export interface KakeleWeaponItems extends KakeleItem {
	level: number;
	vocation: string;
	energy: string;
	attack: string;
	range: number;
	type: "Weapon";
	stats: {
		attack: number;
		magic: number;
		armor: number;
	};
	slot: string;
}

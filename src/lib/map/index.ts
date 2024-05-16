"use server";

import { db } from "@/src/lib/db";

import { admin } from "@/src/actions/admin";

export async function createGenericMapPoints({
	ingameCoordinates,
	mapCoordinates,
	name,
	tag,
	authorId,
}: {
	ingameCoordinates: [number, number];
	mapCoordinates: [number, number];
	name: string;
	tag: string;
	authorId: string;
}) {
	const data = await admin();

	if (data.error || !data.success) {
		return data;
	}

	return db.mapPoint.create({
		data: {
			ingameLatitude: ingameCoordinates[0],
			ingameLongitude: ingameCoordinates[1],
			latitude: mapCoordinates[0],
			longitude: mapCoordinates[1],
			authorId: authorId,
			tag: tag,
			name,
		},
	});
}

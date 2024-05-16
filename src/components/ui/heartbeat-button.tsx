import React from "react";

const HeartbeatButton = ({ children }: { children?: React.ReactNode }) => {
	return (
		<button className="m-9 animate-buttonheartbeat rounded-md bg-red-500 px-4 py-1 text-sm font-semibold text-white">
			{children}
		</button>
	);
};

export default HeartbeatButton;

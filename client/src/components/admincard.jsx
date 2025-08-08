import React from "react";

function AdminCard() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {[
                { label: "Day Sales", value: "3,782" },
                { label: "Total Orders", value: "3,782" },
                { label: "Pending Orders", value: "3,782" },
                { label: "Revenue", value: "3,782" },
            ].map((card, index) => (
                <div
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 md:p-6 shadow-sm"
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-300/30 text-white">
                        {/* Replace with relevant SVG per card */}
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-800 size-6 dark:text-white/90"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48..."
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="flex items-end justify-between mt-5">
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{card.label}</span>
                            <h4 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">{card.value}</h4>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-sm text-green-400 dark:bg-success-500/15 dark:text-success-500">
                            <svg
                                className="fill-current"
                                width="1em"
                                height="1em"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.06 1.62C6.2 1.47 6.4 1.37..."
                                    fill=""
                                />
                            </svg>
                            11.01%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminCard;

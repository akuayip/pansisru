export default function NewsUpdate() {
    return (
        <>
            {/* Divider */}
            <div className="my-16 border-t border-gray-300 dark:border-gray-700"></div>
            {/* Newest Update Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl dark:text-white">
                    Newest Update
                </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Pengumuman Tahap 1 */}
                <div className="relative rounded-xl bg-white p-12 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        PENGUMUMAN
                    </h3>
                    <h3 className="mt-1 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        TAHAP 1
                    </h3>
                </div>

                {/* Pengumuman Tahap 2 */}
                <div className="relative rounded-xl bg-white p-12 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        PENGUMUMAN
                    </h3>
                    <h3 className="mt-1 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        TAHAP 2
                    </h3>
                </div>

                {/* Pengumuman Tahap 3 */}
                <div className="relative rounded-xl bg-white p-12 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        PENGUMUMAN
                    </h3>
                    <h3 className="mt-1 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                        TAHAP 3
                    </h3>
                </div>
            </div>
        </>
    );
}

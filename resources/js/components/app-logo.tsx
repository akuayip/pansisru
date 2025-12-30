export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 shrink-0 items-center justify-center rounded-md p-1 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
                <img
                    src="/logo-sma1.png"
                    alt="Logo SMA Kebanggaan"
                    className="size-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <span className="mb-0.5 truncate leading-tight font-semibold text-[#1e3a5f]">
                    PENSISRU
                </span>
            </div>
        </>
    );
}

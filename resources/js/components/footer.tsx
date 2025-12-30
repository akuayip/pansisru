export default function Footer() {
    return (
        <footer className="bg-gray-900 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-sma1.png"
                            alt="Logo"
                            className="h-10 w-10"
                        />
                        <span className="text-xl font-bold text-white">
                            PANSISRU
                        </span>
                    </div>
                    <p className="text-center text-gray-400">
                        © {new Date().getFullYear()} PANSISRU. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-gray-400 transition hover:text-white"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 transition hover:text-white"
                        >
                            Kontak
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 transition hover:text-white"
                        >
                            Bantuan
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

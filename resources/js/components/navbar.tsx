import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ auth }: { auth: SharedData['auth'] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-sma1.png"
                            alt="Logo"
                            className="h-10 w-10"
                        />
                        <span className="text-md text-lg font-bold text-gray-900 lg:text-xl dark:text-white">
                            PENSISRU SMA KEBANGGAAN
                        </span>
                    </div>

                    {/* Desktop Navigation Links & Auth Buttons */}
                    <div className="hidden items-center gap-6 md:flex">
                        <a
                            href="#home"
                            className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                        >
                            Home
                        </a>
                        <a
                            href="#information"
                            className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                        >
                            Information
                        </a>
                        <a
                            href="#faq"
                            className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                        >
                            FAQ
                        </a>

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Masuk
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-gray-200 py-4 md:hidden dark:border-gray-700">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </a>
                            <a
                                href="#information"
                                className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Information
                            </a>
                            <a
                                href="#faq"
                                className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </a>

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Masuk
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

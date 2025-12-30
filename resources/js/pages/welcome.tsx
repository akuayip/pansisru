import FAQ from '@/components/faq';
import Footer from '@/components/footer';
import NewsUpdate from '@/components/information/news-update';
import RegisInfo from '@/components/information/regis-info';
import Navbar from '@/components/navbar';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PENSISRU">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="relative min-h-screen">
                {/* Background Image */}
                <div className="fixed inset-0 z-0">
                    <img
                        src="/background.png"
                        alt="Background"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Navbar Section */}
                    <Navbar auth={auth} />

                    {/* Hero Section */}
                    <section
                        id="home"
                        className="pt-24 pb-16 lg:pt-32 lg:pb-24"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3a5f] sm:text-4xl lg:text-5xl dark:text-white">
                                        PENSISRU
                                        <span className="block text-3xl md:text-4xl">
                                            Penerimaan Siswa Baru
                                        </span>
                                        <span className="block text-blue-600">
                                            SMA KEBANGGAAN
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-[#2d435f] dark:text-gray-300">
                                        Platform manajemen penerimaan siswa baru
                                        terpadu yang memudahkan pengelolaan
                                        administrasi dan komunikasi antara calon
                                        siswa baru dan pihak sekolah.
                                    </p>
                                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                        {auth.user ? (
                                            <Link
                                                href={dashboard()}
                                                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700"
                                            >
                                                Buka Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={register()}
                                                    className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700"
                                                >
                                                    Daftar Sekarang!
                                                </Link>
                                                <Link
                                                    href={login()}
                                                    className="rounded-lg border-2 border-blue-600 px-8 py-3 text-base font-semibold text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800"
                                                >
                                                    Masuk
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="relative">
                                        <img
                                            src="/photo1.png"
                                            alt="Platform Preview"
                                            className="w-full rounded-xl shadow-lg"
                                        />
                                    </div>
                                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
                                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Registration Information Section */}
                    <section id="information" className="py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <RegisInfo />

                            {/* News-update */}
                            <NewsUpdate />
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <FAQ />

                    {/* Footer Section */}
                    <Footer />
                </div>
            </div>
        </>
    );
}

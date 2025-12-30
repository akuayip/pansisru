import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
    return (
        <section id="faq" className="py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 justify-center text-center">
                    <h2 className="text-4xl font-bold text-[#1e3a5f] dark:text-white">
                        FAQ
                    </h2>
                    <p className="mt-2 text-lg text-[#1e3a5f] dark:text-gray-300">
                        Frequently Asked Questions
                    </p>
                </div>

                <div className="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-900/80">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Bagaimana cara mendaftar sebagai siswa baru?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Anda dapat mendaftar dengan mengklik tombol
                                "Daftar Sekarang" di halaman utama, kemudian
                                mengisi formulir pendaftaran online dengan
                                lengkap dan mengupload dokumen-dokumen yang
                                diperlukan.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apa saja persyaratan dokumen yang harus
                                disiapkan?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Dokumen yang diperlukan antara lain:
                                Ijazah/SKHUN SMP, Kartu Keluarga, Akta
                                Kelahiran, Pas Foto terbaru, dan dokumen
                                prestasi (jika ada).
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Kapan jadwal pendaftaran dibuka?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Jadwal pendaftaran dibuka pada bulan Januari
                                hingga Maret setiap tahunnya. Untuk informasi
                                lebih detail, silakan cek Timeline Pendaftaran
                                di section Information.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apakah ada biaya pendaftaran?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Biaya pendaftaran akan diinformasikan pada saat
                                periode pendaftaran dibuka. Pembayaran dapat
                                dilakukan melalui transfer bank atau payment
                                gateway yang tersedia di sistem.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Bagaimana cara mengecek status pendaftaran saya?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Setelah mendaftar, Anda dapat login ke dashboard
                                untuk melihat status pendaftaran dan pengumuman
                                hasil seleksi. Notifikasi juga akan dikirim
                                melalui email yang Anda daftarkan.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apakah ada jalur pendaftaran khusus untuk siswa
                                berprestasi?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Ya, kami menyediakan jalur prestasi untuk siswa
                                yang memiliki prestasi akademik atau
                                non-akademik. Detail persyaratan dapat dilihat
                                di menu Syarat Pendaftaran.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Bagaimana cara mendaftar sebagai siswa baru?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Anda dapat mendaftar dengan mengklik tombol
                                "Daftar Sekarang" di halaman utama, kemudian
                                mengisi formulir pendaftaran online dengan
                                lengkap dan mengupload dokumen-dokumen yang
                                diperlukan.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apa saja persyaratan dokumen yang harus
                                disiapkan?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Dokumen yang diperlukan antara lain:
                                Ijazah/SKHUN SMP, Kartu Keluarga, Akta
                                Kelahiran, Pas Foto terbaru, dan dokumen
                                prestasi (jika ada).
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Kapan jadwal pendaftaran dibuka?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Jadwal pendaftaran dibuka pada bulan Januari
                                hingga Maret setiap tahunnya. Untuk informasi
                                lebih detail, silakan cek Timeline Pendaftaran
                                di section Information.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apakah ada biaya pendaftaran?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Biaya pendaftaran akan diinformasikan pada saat
                                periode pendaftaran dibuka. Pembayaran dapat
                                dilakukan melalui transfer bank atau payment
                                gateway yang tersedia di sistem.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Bagaimana cara mengecek status pendaftaran saya?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Setelah mendaftar, Anda dapat login ke dashboard
                                untuk melihat status pendaftaran dan pengumuman
                                hasil seleksi. Notifikasi juga akan dikirim
                                melalui email yang Anda daftarkan.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6">
                            <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                                Apakah ada jalur pendaftaran khusus untuk siswa
                                berprestasi?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400">
                                Ya, kami menyediakan jalur prestasi untuk siswa
                                yang memiliki prestasi akademik atau
                                non-akademik. Detail persyaratan dapat dilihat
                                di menu Syarat Pendaftaran.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BookOpen, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tes Akademik',
        href: '/cbt',
    },
];

export default function CBTLanding() {
    const handleStartTest = () => {
        // Request fullscreen before navigating
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
                .then(() => {
                    router.visit('/cbt/test');
                })
                .catch(() => {
                    // If fullscreen fails, still navigate
                    router.visit('/cbt/test');
                });
        } else {
            router.visit('/cbt/test');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CBT - Tes Akademik" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card className="mx-auto w-full max-w-3xl">
                    <CardHeader className="text-center">
                        <BookOpen className="mx-auto mb-4 h-20 w-20 text-[#1e3a5f]" />
                        <CardTitle className="text-3xl font-bold">
                            TES AKADEMIK SMA KEBANGGAAN
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Computer Based Test - Ujian Berbasis Komputer
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                            <div className="flex items-center justify-center gap-3 text-2xl font-semibold text-gray-700">
                                <Clock className="h-8 w-8 text-[#1e3a5f]" />
                                <span>Waktu Tes: 120 Menit</span>
                            </div>
                        </div>

                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">
                                Petunjuk Pengerjaan
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                                        1
                                    </span>
                                    <span>
                                        Tes terdiri dari 35 soal pilihan ganda
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                                        2
                                    </span>
                                    <span>Waktu pengerjaan 120 menit</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                                        3
                                    </span>
                                    <span>
                                        Pastikan koneksi internet Anda stabil
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                                        4
                                    </span>
                                    <span>
                                        Klik tombol "Ragu-Ragu" jika Anda ingin
                                        menandai soal
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a5f] text-xs text-white">
                                        5
                                    </span>
                                    <span>
                                        Klik "Hentikan Ujian" jika sudah selesai
                                        mengerjakan
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="text-center text-sm font-semibold text-red-700">
                                ⚠️ Setelah mengklik "Mulai Ujian", aplikasi akan
                                masuk ke mode layar penuh
                            </p>
                        </div>

                        <Button
                            onClick={handleStartTest}
                            size="lg"
                            className="w-full bg-[#1e3a5f] py-6 text-xl font-bold hover:bg-[#16325c]"
                        >
                            Mulai Ujian
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

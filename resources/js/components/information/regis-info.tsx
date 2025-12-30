import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AlurRegis from './alur-regis';
import SyaratRegis from './syarat-regis';
import TimelineRegis from './timeline-regis';

export default function RegisInfo() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    Registration Information
                </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Alur Pendaftaran */}
                <div className="relative rounded-xl bg-white p-8 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Alur
                    </h3>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Pendaftaran
                    </h3>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="mt-6 rounded-lg bg-[#1e3a5f] px-8 py-2.5 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#2d4a6f]">
                                CEK DISINI!
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-h-[85vh] max-w-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Alur Pendaftaran
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription asChild>
                                <div className="max-h-[55vh] overflow-y-auto pr-2">
                                    <AlurRegis />
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Tutup</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                        • Last update 16 Agustus 2025
                    </p>
                </div>

                {/* Syarat Pendaftaran */}
                <div className="relative rounded-xl bg-white p-8 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Syarat
                    </h3>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Pendaftaran
                    </h3>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="mt-6 rounded-lg bg-[#1e3a5f] px-8 py-2.5 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#2d4a6f]">
                                CEK DISINI!
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-h-[85vh] max-w-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Syarat Pendaftaran
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription asChild>
                                <div className="max-h-[55vh] overflow-y-auto pr-2">
                                    <SyaratRegis />
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Tutup</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                        • Last update 16 Agustus 2025
                    </p>
                </div>

                {/* Timeline Pendaftaran */}
                <div className="relative rounded-xl bg-white p-8 text-center shadow-md transition hover:shadow-lg dark:bg-gray-900">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Timeline
                    </h3>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Pendaftaran
                    </h3>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="mt-6 rounded-lg bg-[#1e3a5f] px-8 py-2.5 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#2d4a6f]">
                                CEK DISINI!
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-h-[85vh] max-w-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Timeline Pendaftaran
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription asChild>
                                <div className="max-h-[55vh] overflow-y-auto pr-2">
                                    <TimelineRegis />
                                </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Tutup</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                        • Last update 16 Agustus 2025
                    </p>
                </div>
            </div>
        </>
    );
}

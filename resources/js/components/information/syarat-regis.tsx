export default function SyaratRegis() {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                    Persyaratan Umum:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>
                            Lulusan SMP/MTs atau sederajat (tahun berjalan atau
                            1 tahun sebelumnya)
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>
                            Usia maksimal 18 tahun pada awal tahun ajaran
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Sehat jasmani dan rohani</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Berkelakuan baik</span>
                    </li>
                </ul>
            </div>

            <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                    Dokumen yang Diperlukan:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Ijazah/SKHUN SMP/MTs (asli dan fotokopi)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Kartu Keluarga (fotokopi)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Akta Kelahiran (fotokopi)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Pas foto terbaru ukuran 3x4 (5 lembar)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>
                            Surat keterangan sehat dari dokter/puskesmas
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>
                            Surat keterangan berkelakuan baik dari sekolah asal
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>
                            Piagam/sertifikat prestasi (jika ada, untuk jalur
                            prestasi)
                        </span>
                    </li>
                </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                    <strong>Catatan:</strong> Semua dokumen harus diunggah dalam
                    format PDF atau JPG dengan ukuran maksimal 2MB per file.
                </p>
            </div>
        </div>
    );
}

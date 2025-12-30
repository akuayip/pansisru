import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import information from '@/routes/information';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Information',
        href: information.index().url,
    },
    {
        title: 'Tambah Informasi',
        href: information.create().url,
    },
];

export default function InformationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        pdf_file: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(information.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Informasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Link href={information.index().url}>
                                <Button variant="outline" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <CardTitle>Tambah Informasi Baru</CardTitle>
                                <CardDescription>
                                    Buat informasi atau pengumuman baru
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Informasi</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Masukkan judul informasi"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Deskripsi Informasi
                                </Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Masukkan deskripsi informasi"
                                    rows={5}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pdf_file">
                                    Upload File PDF (Opsional)
                                </Label>
                                <Input
                                    id="pdf_file"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setData(
                                            'pdf_file',
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Maksimal 10MB. Format: PDF
                                </p>
                                <InputError message={errors.pdf_file} />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={information.index().url}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

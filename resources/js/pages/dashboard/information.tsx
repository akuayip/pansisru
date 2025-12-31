import InputError from '@/components/input-error';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import information from '@/routes/information';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, FileDown, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Information',
        href: information.index().url,
    },
];

interface Information {
    id: number;
    title: string;
    description: string;
    pdf_file: string | null;
    release_date: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    information: Information[];
}

export default function InformationIndex({ information: informations }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        pdf_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            router.post(
                information.update({ information: editingId }).url,
                {
                    _method: 'put',
                    title: data.title,
                    description: data.description,
                    pdf_file: data.pdf_file,
                },
                {
                    onSuccess: () => {
                        reset();
                        setEditingId(null);
                        setShowForm(false);
                    },
                },
            );
        } else {
            post(information.store().url, {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleEdit = (info: Information) => {
        setData({
            title: info.title,
            description: info.description,
            pdf_file: null,
        });
        setEditingId(info.id);
        setShowForm(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(information.destroy({ information: deleteId }).url);
            setDeleteId(null);
        }
    };

    const handleCancel = () => {
        reset();
        setEditingId(null);
        setShowForm(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Information" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Daftar Informasi</CardTitle>
                                <CardDescription>
                                    Kelola informasi dan pengumuman
                                </CardDescription>
                            </div>
                            {!showForm && (
                                <Button
                                    onClick={() => setShowForm(true)}
                                    size="sm"
                                >
                                    <Plus className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">
                                        Tambah Informasi
                                    </span>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {showForm && (
                            <Card className="border-primary">
                                <CardHeader>
                                    <CardTitle>
                                        {editingId
                                            ? 'Edit Informasi'
                                            : 'Tambah Informasi'}
                                    </CardTitle>
                                    <CardDescription>
                                        {editingId
                                            ? 'Perbarui informasi yang sudah ada'
                                            : 'Buat informasi baru dengan file PDF'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Judul</Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        'title',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan judul informasi"
                                            />
                                            <InputError
                                                message={errors.title}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Deskripsi
                                            </Label>
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        'description',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan deskripsi informasi"
                                                rows={4}
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="pdf_file">
                                                File PDF{' '}
                                                {editingId && '(Opsional)'}
                                            </Label>
                                            <Input
                                                id="pdf_file"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) =>
                                                    setData(
                                                        'pdf_file',
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Upload file PDF (Max 10MB)
                                                {editingId &&
                                                    ' - Kosongkan jika tidak ingin mengubah file'}
                                            </p>
                                            <InputError
                                                message={errors.pdf_file}
                                            />
                                        </div>

                                        <div className="flex justify-end gap-4">
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={handleCancel}
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Menyimpan...'
                                                    : editingId
                                                      ? 'Perbarui'
                                                      : 'Simpan'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Tanggal Rilis</TableHead>
                                        <TableHead>File PDF</TableHead>
                                        <TableHead className="text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {informations.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center"
                                            >
                                                <div className="py-8">
                                                    <p className="text-muted-foreground">
                                                        Belum ada informasi.
                                                        Klik tombol "Tambah
                                                        Informasi" untuk membuat
                                                        yang pertama.
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        informations.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">
                                                    {item.title}
                                                </TableCell>
                                                <TableCell>
                                                    {item.description.length >
                                                    100
                                                        ? item.description.substring(
                                                              0,
                                                              100,
                                                          ) + '...'
                                                        : item.description}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        item.release_date,
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {item.pdf_file ? (
                                                        <a
                                                            href={`/storage/${item.pdf_file}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-sm text-primary hover:underline"
                                                        >
                                                            <FileDown className="mr-1 h-4 w-4" />
                                                            Download
                                                        </a>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            -
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                setDeleteId(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Informasi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus informasi ini?
                            File PDF yang terkait juga akan dihapus. Tindakan
                            ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

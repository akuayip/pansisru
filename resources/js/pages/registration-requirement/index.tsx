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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Syarat Pendaftaran',
        href: '#',
    },
];

interface RegistrationRequirement {
    id: number;
    title: string;
    description: string;
    type: 'umum' | 'dokumen';
    created_at: string;
    updated_at: string;
}

interface Props {
    requirements: RegistrationRequirement[];
}

export default function RegistrationRequirementIndex({ requirements }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/registration-requirement/${deleteId}`);
            setDeleteId(null);
        }
    };

    const getTypeLabel = (type: 'umum' | 'dokumen') => {
        return type === 'umum' ? 'Persyaratan Umum' : 'Dokumen yang Diperlukan';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Syarat Pendaftaran" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Syarat Pendaftaran</CardTitle>
                                <CardDescription>
                                    Kelola syarat pendaftaran mahasiswa baru
                                </CardDescription>
                            </div>
                            <Link href="/registration-requirement/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Syarat
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requirements.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            Belum ada data syarat pendaftaran
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    requirements.map((requirement, index) => (
                                        <TableRow key={requirement.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {requirement.title}
                                            </TableCell>
                                            <TableCell>
                                                {requirement.description
                                                    .length > 100
                                                    ? requirement.description.substring(
                                                          0,
                                                          100,
                                                      ) + '...'
                                                    : requirement.description}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                                                    {getTypeLabel(
                                                        requirement.type,
                                                    )}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/registration-requirement/${requirement.id}/edit`}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setDeleteId(
                                                                requirement.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={(open) => !open && setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data syarat
                            pendaftaran akan dihapus secara permanen.
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

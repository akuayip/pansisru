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
import information from '@/routes/information';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, FileText, Plus, Trash2 } from 'lucide-react';
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

export default function InformationIndex({ information: data }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(information.destroy({ information: deleteId }).url, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Information" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Daftar Informasi</CardTitle>
                            <CardDescription>
                                Kelola informasi dan pengumuman
                            </CardDescription>
                        </div>
                        <Link href={information.create().url}>
                            <Button className="cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Tambah Informasi
                                </span>
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-muted-foreground">
                                    Belum ada informasi yang ditambahkan
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead className="w-[120px]">
                                            Tanggal Rilis
                                        </TableHead>
                                        <TableHead className="w-[100px]">
                                            File PDF
                                        </TableHead>
                                        <TableHead className="w-[120px] text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="max-w-xs truncate font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell className="max-w-md truncate">
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    item.release_date,
                                                ).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                {item.pdf_file ? (
                                                    <a
                                                        href={`/storage/${item.pdf_file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                    </a>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={
                                                            information.edit({
                                                                information:
                                                                    item.id,
                                                            }).url
                                                        }
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setDeleteId(item.id)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={(open) => !open && setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Informasi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus informasi ini?
                            Tindakan ini tidak dapat dibatalkan dan file PDF
                            akan ikut terhapus.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="cursor-pointer"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

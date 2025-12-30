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
import faq from '@/routes/faq';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: faq.index().url,
    },
];

interface FAQ {
    id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    faqs: FAQ[];
}

export default function FAQIndex({ faqs }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(faq.destroy({ faq: deleteId }).url, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>
                                Daftar Frequently Asked Questions
                            </CardTitle>
                            <CardDescription>
                                Kelola pertanyaan dan jawaban yang sering
                                ditanyakan
                            </CardDescription>
                        </div>
                        <Link href={faq.create().url}>
                            <Button className="cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah FAQ
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {faqs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-muted-foreground">
                                    Belum ada FAQ yang ditambahkan
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pertanyaan</TableHead>
                                        <TableHead>Jawaban</TableHead>
                                        <TableHead className="w-[120px] text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {faqs.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="max-w-xs truncate">
                                                {item.question}
                                            </TableCell>
                                            <TableCell className="max-w-md truncate">
                                                {item.answer}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={
                                                            faq.edit({
                                                                faq: item.id,
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
                        <AlertDialogTitle>Hapus FAQ</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus FAQ ini? Tindakan
                            ini tidak dapat dibatalkan.
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

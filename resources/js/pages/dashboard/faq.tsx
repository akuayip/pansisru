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
import AppLayout from '@/layouts/app-layout';
import faq from '@/routes/faq';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        question: '',
        answer: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(faq.update({ faq: editingId }).url, {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                    setShowForm(false);
                },
            });
        } else {
            post(faq.store().url, {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleEdit = (faqItem: FAQ) => {
        setData({
            question: faqItem.question,
            answer: faqItem.answer,
        });
        setEditingId(faqItem.id);
        setShowForm(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(faq.destroy({ faq: deleteId }).url);
            setDeleteId(null);
        }
    };

    const handleCancel = () => {
        reset();
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>
                                    Daftar Frequently Asked Questions
                                </CardTitle>
                                <CardDescription>
                                    Kelola pertanyaan dan jawaban yang sering
                                    ditanyakan
                                </CardDescription>
                            </div>
                            {!showForm && (
                                <Button
                                    onClick={() => setShowForm(true)}
                                    size="sm"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah FAQ
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {showForm && (
                            <Card className="border-primary">
                                <CardHeader>
                                    <CardTitle>
                                        {editingId ? 'Edit FAQ' : 'Tambah FAQ'}
                                    </CardTitle>
                                    <CardDescription>
                                        {editingId
                                            ? 'Perbarui pertanyaan dan jawaban FAQ'
                                            : 'Buat pertanyaan dan jawaban baru'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="question">
                                                Pertanyaan
                                            </Label>
                                            <Input
                                                id="question"
                                                type="text"
                                                value={data.question}
                                                onChange={(e) =>
                                                    setData(
                                                        'question',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan pertanyaan"
                                            />
                                            <InputError
                                                message={errors.question}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="answer">
                                                Jawaban
                                            </Label>
                                            <textarea
                                                id="answer"
                                                value={data.answer}
                                                onChange={(e) =>
                                                    setData(
                                                        'answer',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan jawaban"
                                                rows={5}
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                            <InputError
                                                message={errors.answer}
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

                        <div className="space-y-4">
                            {faqs.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-8 text-center">
                                    <p className="text-muted-foreground">
                                        Belum ada FAQ. Klik tombol "Tambah FAQ"
                                        untuk membuat yang pertama.
                                    </p>
                                </div>
                            ) : (
                                faqs.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="pt-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <h3 className="font-semibold">
                                                        {item.question}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
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
                                                            setDeleteId(item.id)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
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
                        <AlertDialogTitle>Hapus FAQ</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus FAQ ini? Tindakan
                            ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
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

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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { BookOpen, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface BankSoal {
    id: number;
    type: 'pilihan_ganda' | 'multi_pilihan' | 'benar_salah';
    question: string;
    question_image: string | null;
    options: string[];
    option_images: (string | null)[];
    correct_answer: string[];
    created_at: string;
}

interface PaginatedSoals {
    data: BankSoal[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    soals: PaginatedSoals;
    filters: {
        search: string;
        per_page: number;
    };
}

export default function Index({ soals, filters }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || 5);

    const { data, setData, reset, errors } = useForm<{
        type: string;
        question: string;
        question_image: File | null;
        options: string[];
        option_images: (File | null)[];
        correct_answer: string[];
    }>({
        type: 'pilihan_ganda',
        question: '',
        question_image: null,
        options: ['', '', '', '', ''],
        option_images: [null, null, null, null, null],
        correct_answer: [],
    });

    const typeLabels = {
        pilihan_ganda: 'Pilihan Ganda',
        multi_pilihan: 'Multi Pilihan',
        benar_salah: 'Benar/Salah',
    };

    const handleTypeChange = (value: string) => {
        setData({
            ...data,
            type: value,
            options:
                value === 'benar_salah'
                    ? ['Benar', 'Salah']
                    : ['', '', '', '', ''],
            option_images:
                value === 'benar_salah'
                    ? [null, null]
                    : [null, null, null, null, null],
            correct_answer: [],
        });
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const handleCorrectAnswerChange = (index: number, checked: boolean) => {
        if (data.type === 'pilihan_ganda' || data.type === 'benar_salah') {
            setData('correct_answer', checked ? [index.toString()] : []);
        } else {
            const newCorrectAnswer = checked
                ? [...data.correct_answer, index.toString()]
                : data.correct_answer.filter((i) => i !== index.toString());
            setData('correct_answer', newCorrectAnswer);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(`/bank-soal/${editingId}`, data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    setEditingId(null);
                    reset();
                },
            });
        } else {
            router.post('/bank-soal', data, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (soal: BankSoal) => {
        setData({
            type: soal.type,
            question: soal.question,
            question_image: null,
            options: soal.options,
            option_images: soal.option_images?.length
                ? soal.option_images.map(() => null)
                : [null, null, null, null, null],
            correct_answer: soal.correct_answer,
        });
        setEditingId(soal.id);
        setIsFormOpen(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/bank-soal/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        reset();
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            '/bank-soal',
            { search: value, per_page: perPage },
            { preserveState: true, replace: true },
        );
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(Number(value));
        router.get(
            '/bank-soal',
            { search, per_page: value },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <Head title="Bank Soal" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Bank Soal</CardTitle>
                                <CardDescription>
                                    Kelola soal ujian dengan berbagai tipe
                                    pertanyaan
                                </CardDescription>
                            </div>
                            {!isFormOpen && (
                                <Button onClick={() => setIsFormOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Soal
                                </Button>
                            )}
                        </div>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari soal..."
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label className="text-sm whitespace-nowrap text-muted-foreground">
                                    Tampilkan:
                                </Label>
                                <Select
                                    value={perPage.toString()}
                                    onValueChange={handlePerPageChange}
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isFormOpen && (
                            <Card className="border-2">
                                <CardHeader>
                                    <CardTitle>
                                        {editingId
                                            ? 'Edit Soal'
                                            : 'Tambah Soal Baru'}
                                    </CardTitle>
                                    <CardDescription>
                                        Isi form di bawah untuk{' '}
                                        {editingId ? 'mengubah' : 'menambahkan'}{' '}
                                        soal
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="type">
                                                Tipe Soal
                                            </Label>
                                            <Select
                                                value={data.type}
                                                onValueChange={handleTypeChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih tipe soal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pilihan_ganda">
                                                        Pilihan Ganda
                                                    </SelectItem>
                                                    <SelectItem value="multi_pilihan">
                                                        Multi Pilihan
                                                    </SelectItem>
                                                    <SelectItem value="benar_salah">
                                                        Benar/Salah
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && (
                                                <p className="text-sm text-destructive">
                                                    {errors.type}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="question">
                                                Pertanyaan
                                            </Label>
                                            <Input
                                                id="question"
                                                value={data.question}
                                                onChange={(e) =>
                                                    setData(
                                                        'question',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan pertanyaan..."
                                            />
                                            {errors.question && (
                                                <p className="text-sm text-destructive">
                                                    {errors.question}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="question_image">
                                                Gambar Pertanyaan (Opsional)
                                            </Label>
                                            <Input
                                                id="question_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        'question_image',
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Upload gambar untuk soal
                                                matematika atau soal dengan
                                                diagram (Max 1MB)
                                            </p>
                                            {errors.question_image && (
                                                <p className="text-sm text-destructive">
                                                    {errors.question_image}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Pilihan Jawaban</Label>
                                            <div className="space-y-3">
                                                {data.type === 'benar_salah' ? (
                                                    <>
                                                        {['Benar', 'Salah'].map(
                                                            (option, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center gap-3"
                                                                >
                                                                    <Checkbox
                                                                        checked={data.correct_answer.includes(
                                                                            index.toString(),
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            handleCorrectAnswerChange(
                                                                                index,
                                                                                checked as boolean,
                                                                            )
                                                                        }
                                                                    />
                                                                    <div className="flex-1 rounded-md border bg-muted px-3 py-2">
                                                                        {option}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {[
                                                            'a',
                                                            'b',
                                                            'c',
                                                            'd',
                                                            'e',
                                                        ].map(
                                                            (letter, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="space-y-2"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <Checkbox
                                                                            checked={data.correct_answer.includes(
                                                                                index.toString(),
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked,
                                                                            ) =>
                                                                                handleCorrectAnswerChange(
                                                                                    index,
                                                                                    checked as boolean,
                                                                                )
                                                                            }
                                                                        />
                                                                        <span className="w-8 font-medium">
                                                                            {
                                                                                letter
                                                                            }
                                                                            .
                                                                        </span>
                                                                        <Input
                                                                            value={
                                                                                data
                                                                                    .options[
                                                                                    index
                                                                                ] ||
                                                                                ''
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                handleOptionChange(
                                                                                    index,
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            placeholder={`Masukkan pilihan ${letter}`}
                                                                            className="flex-1"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-11">
                                                                        <Input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                const newOptionImages =
                                                                                    [
                                                                                        ...data.option_images,
                                                                                    ];
                                                                                newOptionImages[
                                                                                    index
                                                                                ] =
                                                                                    e
                                                                                        .target
                                                                                        .files?.[0] ||
                                                                                    null;
                                                                                setData(
                                                                                    'option_images',
                                                                                    newOptionImages,
                                                                                );
                                                                            }}
                                                                            className="text-xs"
                                                                        />
                                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                                            Gambar
                                                                            untuk
                                                                            pilihan{' '}
                                                                            {
                                                                                letter
                                                                            }{' '}
                                                                            (opsional)
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {data.type ===
                                                    'pilihan_ganda' &&
                                                    'Centang satu pilihan sebagai jawaban benar'}
                                                {data.type ===
                                                    'multi_pilihan' &&
                                                    'Centang satu atau lebih pilihan sebagai jawaban benar'}
                                                {data.type === 'benar_salah' &&
                                                    'Centang jawaban yang benar'}
                                            </p>
                                            {errors.options && (
                                                <p className="text-sm text-destructive">
                                                    {errors.options}
                                                </p>
                                            )}
                                            {errors.correct_answer && (
                                                <p className="text-sm text-destructive">
                                                    {errors.correct_answer}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button type="submit">
                                                {editingId
                                                    ? 'Simpan Perubahan'
                                                    : 'Tambah Soal'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleCancel}
                                            >
                                                Batal
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        <div className="space-y-4">
                            {soals.data.length === 0 ? (
                                <Card>
                                    <CardContent className="py-12">
                                        <div className="text-center text-muted-foreground">
                                            <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
                                            <p>
                                                Belum ada soal. Klik "Tambah
                                                Soal" untuk memulai.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                soals.data.map((soal, soalIndex) => (
                                    <Card key={soal.id}>
                                        <CardContent className="pt-6">
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700">
                                                                {
                                                                    typeLabels[
                                                                        soal
                                                                            .type
                                                                    ]
                                                                }
                                                            </span>
                                                            <span className="text-sm text-muted-foreground">
                                                                Soal #
                                                                {soalIndex + 1}
                                                            </span>
                                                        </div>
                                                        <p className="text-base font-medium">
                                                            {soal.question}
                                                        </p>
                                                        {soal.question_image && (
                                                            <div className="mt-3">
                                                                <img
                                                                    src={`/storage/${soal.question_image}`}
                                                                    alt="Question"
                                                                    className="max-w-md rounded border"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleEdit(soal)
                                                            }
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                setDeleteId(
                                                                    soal.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 pl-4">
                                                    {soal.type ===
                                                    'benar_salah' ? (
                                                        <>
                                                            {soal.options.map(
                                                                (
                                                                    option,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`flex items-center gap-2 rounded px-3 py-2 ${
                                                                            soal.correct_answer.includes(
                                                                                index.toString(),
                                                                            )
                                                                                ? 'border border-green-200 bg-green-50'
                                                                                : 'bg-muted'
                                                                        }`}
                                                                    >
                                                                        <span className="text-sm">
                                                                            {
                                                                                option
                                                                            }
                                                                        </span>
                                                                        {soal.correct_answer.includes(
                                                                            index.toString(),
                                                                        ) && (
                                                                            <span className="ml-auto text-xs font-medium text-green-700">
                                                                                Jawaban
                                                                                Benar
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {soal.options.map(
                                                                (
                                                                    option,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`rounded px-3 py-2 ${
                                                                            soal.correct_answer.includes(
                                                                                index.toString(),
                                                                            )
                                                                                ? 'border border-green-200 bg-green-50'
                                                                                : 'bg-muted'
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="font-medium">
                                                                                {String.fromCharCode(
                                                                                    97 +
                                                                                        index,
                                                                                )}

                                                                                .
                                                                            </span>
                                                                            <span className="text-sm">
                                                                                {
                                                                                    option
                                                                                }
                                                                            </span>
                                                                            {soal.correct_answer.includes(
                                                                                index.toString(),
                                                                            ) && (
                                                                                <span className="ml-auto text-xs font-medium text-green-700">
                                                                                    Jawaban
                                                                                    Benar
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {soal
                                                                            .option_images?.[
                                                                            index
                                                                        ] && (
                                                                            <div className="mt-2 ml-6">
                                                                                <img
                                                                                    src={`/storage/${soal.option_images[index]}`}
                                                                                    alt={`Option ${String.fromCharCode(97 + index)}`}
                                                                                    className="max-w-xs rounded border"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                        {soals.last_page > 1 && (
                            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan {soals.from} - {soals.to} dari{' '}
                                    {soals.total} soal
                                </p>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={`/bank-soal?page=${soals.current_page - 1}&search=${search}&per_page=${perPage}`}
                                                className={
                                                    soals.current_page === 1
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>

                                        {Array.from(
                                            { length: soals.last_page },
                                            (_, i) => i + 1,
                                        )
                                            .filter((page) => {
                                                const current =
                                                    soals.current_page;
                                                return (
                                                    page === 1 ||
                                                    page === soals.last_page ||
                                                    (page >= current - 1 &&
                                                        page <= current + 1)
                                                );
                                            })
                                            .map((page, index, array) => (
                                                <React.Fragment key={page}>
                                                    {index > 0 &&
                                                        array[index - 1] !==
                                                            page - 1 && (
                                                            <PaginationItem>
                                                                <PaginationEllipsis />
                                                            </PaginationItem>
                                                        )}
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href={`/bank-soal?page=${page}&search=${search}&per_page=${perPage}`}
                                                            isActive={
                                                                page ===
                                                                soals.current_page
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </React.Fragment>
                                            ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                href={`/bank-soal?page=${soals.current_page + 1}&search=${search}&per_page=${perPage}`}
                                                className={
                                                    soals.current_page ===
                                                    soals.last_page
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Soal</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus soal ini? Tindakan
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

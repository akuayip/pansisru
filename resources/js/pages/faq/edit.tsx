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
import faq from '@/routes/faq';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: faq.index().url,
    },
    {
        title: 'Edit FAQ',
        href: '#',
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
    faq: FAQ;
}

export default function FAQEdit({ faq: faqData }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        question: faqData.question,
        answer: faqData.answer,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(faq.update({ faq: faqData.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Link href={faq.index().url}>
                                <Button variant="outline" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <CardTitle>Edit FAQ</CardTitle>
                                <CardDescription>
                                    Perbarui pertanyaan dan jawaban FAQ
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="question">Pertanyaan</Label>
                                <Input
                                    id="question"
                                    type="text"
                                    value={data.question}
                                    onChange={(e) =>
                                        setData('question', e.target.value)
                                    }
                                    placeholder="Masukkan pertanyaan"
                                />
                                <InputError message={errors.question} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="answer">Jawaban</Label>
                                <textarea
                                    id="answer"
                                    value={data.answer}
                                    onChange={(e) =>
                                        setData('answer', e.target.value)
                                    }
                                    placeholder="Masukkan jawaban"
                                    rows={5}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.answer} />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={faq.index().url}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Perbarui'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

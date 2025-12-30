import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registration',
        href: '/registration',
    },
    {
        title: 'Edit Syarat',
        href: '#',
    },
];

interface RegistrationRequirement {
    id: number;
    description: string;
    type: 'umum' | 'dokumen';
    created_at: string;
    updated_at: string;
}

interface Props {
    requirement: RegistrationRequirement;
}

export default function RegistrationRequirementEdit({ requirement }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        description: requirement.description,
        type: requirement.type,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/registration-requirement/${requirement.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Syarat Pendaftaran" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Link href="/registration">
                                <Button variant="outline" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <CardTitle>Edit Syarat Pendaftaran</CardTitle>
                                <CardDescription>
                                    Perbarui syarat pendaftaran
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Masukkan deskripsi syarat"
                                    rows={5}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe Syarat</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData(
                                            'type',
                                            value as 'umum' | 'dokumen',
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe syarat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="umum">
                                            Persyaratan Umum
                                        </SelectItem>
                                        <SelectItem value="dokumen">
                                            Dokumen yang Diperlukan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href="/registration">
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

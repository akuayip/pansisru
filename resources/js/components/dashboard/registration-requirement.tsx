import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { RegistrationRequirement } from '@/types/registration';
import { router, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

// Export form component untuk digunakan di tempat lain
interface RequirementFormProps {
    requirement?: RegistrationRequirement;
    onSuccess: () => void;
    onCancel: () => void;
}

export function RequirementForm({
    requirement,
    onSuccess,
    onCancel,
}: RequirementFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        description: requirement?.description || '',
        type: requirement?.type || ('umum' as 'umum' | 'dokumen'),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (requirement) {
            router.post(
                `/registration/requirement/${requirement.id}`,
                {
                    _method: 'put',
                    description: data.description,
                    type: data.type,
                },
                {
                    onSuccess: () => {
                        reset();
                        onSuccess();
                    },
                },
            );
        } else {
            post('/registration/requirement', {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-4 space-y-3 rounded-lg border bg-muted/50 p-3"
        >
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">
                    {requirement ? 'Edit' : 'Tambah'} Syarat Pendaftaran
                </h4>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={onCancel}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div>
                <Label htmlFor="requirement-type">Tipe</Label>
                <Select
                    value={data.type}
                    onValueChange={(value) =>
                        setData('type', value as 'umum' | 'dokumen')
                    }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="umum">Persyaratan Umum</SelectItem>
                        <SelectItem value="dokumen">
                            Dokumen yang Diperlukan
                        </SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={errors.type} />
            </div>
            <div>
                <Label htmlFor="requirement-description">Deskripsi</Label>
                <textarea
                    id="requirement-description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                    placeholder="Masukkan deskripsi syarat"
                />
                <InputError message={errors.description} />
            </div>
            <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                >
                    Batal
                </Button>
            </div>
        </form>
    );
}

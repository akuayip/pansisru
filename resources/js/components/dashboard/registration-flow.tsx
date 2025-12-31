import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegistrationFlow } from '@/types/registration';
import { router, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

interface FlowFormProps {
    flow?: RegistrationFlow;
    onSuccess: () => void;
    onCancel: () => void;
}

export function FlowForm({ flow, onSuccess, onCancel }: FlowFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: flow?.title || '',
        description: flow?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (flow) {
            router.post(
                `/registration/flow/${flow.id}`,
                {
                    _method: 'put',
                    title: data.title,
                    description: data.description,
                },
                {
                    onSuccess: () => {
                        reset();
                        onSuccess();
                    },
                },
            );
        } else {
            post('/registration/flow', {
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
                    {flow ? 'Edit' : 'Tambah'} Alur Pendaftaran
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
                <Label htmlFor="flow-title">Judul</Label>
                <Input
                    id="flow-title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1"
                    placeholder="Masukkan judul alur"
                />
                <InputError message={errors.title} />
            </div>
            <div>
                <Label htmlFor="flow-description">Deskripsi</Label>
                <textarea
                    id="flow-description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                    placeholder="Masukkan deskripsi alur"
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

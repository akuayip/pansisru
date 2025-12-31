import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import type { RegistrationTimeline } from '@/types/registration';
import { router, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timeline Pendaftaran',
        href: '/registration-timeline',
    },
];

interface Props {
    timelines: RegistrationTimeline[];
}

// Export form component untuk digunakan di tempat lain
interface TimelineFormProps {
    timeline?: RegistrationTimeline;
    onSuccess: () => void;
    onCancel: () => void;
}

export function TimelineForm({
    timeline,
    onSuccess,
    onCancel,
}: TimelineFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: timeline?.title || '',
        start_date: timeline?.start_date.split('T')[0] || '',
        end_date: timeline?.end_date.split('T')[0] || '',
        status:
            timeline?.status ||
            ('Segera' as 'Segera' | 'Dibuka' | 'Diproses' | 'Ditutup'),
        description: timeline?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (timeline) {
            router.post(
                `/registration/timeline/${timeline.id}`,
                {
                    _method: 'put',
                    title: data.title,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    status: data.status,
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
            post('/registration/timeline', {
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
                    {timeline ? 'Edit' : 'Tambah'} Timeline Pendaftaran
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
                <Label htmlFor="timeline-title">Judul</Label>
                <Input
                    id="timeline-title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1"
                    placeholder="Masukkan judul timeline"
                />
                <InputError message={errors.title} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Label htmlFor="timeline-start">Tanggal Mulai</Label>
                    <Input
                        id="timeline-start"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        className="mt-1"
                    />
                    <InputError message={errors.start_date} />
                </div>
                <div>
                    <Label htmlFor="timeline-end">Tanggal Selesai</Label>
                    <Input
                        id="timeline-end"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        className="mt-1"
                    />
                    <InputError message={errors.end_date} />
                </div>
            </div>
            <div>
                <Label htmlFor="timeline-status">Status</Label>
                <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value as any)}
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Segera">Segera</SelectItem>
                        <SelectItem value="Dibuka">Dibuka</SelectItem>
                        <SelectItem value="Diproses">Diproses</SelectItem>
                        <SelectItem value="Ditutup">Ditutup</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={errors.status} />
            </div>
            <div>
                <Label htmlFor="timeline-description">Deskripsi</Label>
                <textarea
                    id="timeline-description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                    placeholder="Masukkan deskripsi timeline"
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

import { FlowForm } from '@/components/dashboard/registration-flow';
import { RequirementForm } from '@/components/dashboard/registration-requirement';
import { TimelineForm } from '@/components/dashboard/registration-timeline';
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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type {
    RegistrationFlow,
    RegistrationRequirement,
    RegistrationTimeline,
} from '@/types/registration';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import {
    Calendar,
    CheckSquare,
    GitBranch,
    GripVertical,
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registration',
        href: '/registration',
    },
];

interface Props {
    flows: RegistrationFlow[];
    requirements: RegistrationRequirement[];
    timelines: RegistrationTimeline[];
}

interface SortableFlowItemProps {
    flow: RegistrationFlow;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

function SortableFlowItem({ flow, onEdit, onDelete }: SortableFlowItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: flow.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="space-y-2 rounded-lg border bg-white p-3"
        >
            <div className="flex items-start gap-2">
                <button
                    className="mt-1 cursor-grab touch-none active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium">
                        {flow.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {flow.description}
                    </p>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onEdit(flow.id)}
                    >
                        <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onDelete(flow.id)}
                    >
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

interface SortableTimelineItemProps {
    timeline: RegistrationTimeline;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

interface SortableRequirementItemProps {
    requirement: RegistrationRequirement;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

function SortableRequirementItem({
    requirement,
    onEdit,
    onDelete,
}: SortableRequirementItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: requirement.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="space-y-2 rounded-lg border bg-white p-3"
        >
            <div className="flex items-start gap-2">
                <button
                    className="mt-1 cursor-grab touch-none active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                        {requirement.description}
                    </p>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onEdit(requirement.id)}
                    >
                        <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onDelete(requirement.id)}
                    >
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SortableTimelineItem({
    timeline,
    onEdit,
    onDelete,
}: SortableTimelineItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: timeline.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="space-y-2 rounded-lg border bg-white p-3"
        >
            <div className="flex items-start gap-2">
                <button
                    className="mt-1 cursor-grab touch-none active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium">
                        {timeline.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(timeline.start_date).toLocaleDateString(
                            'id-ID',
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            },
                        )}{' '}
                        -{' '}
                        {new Date(timeline.end_date).toLocaleDateString(
                            'id-ID',
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            },
                        )}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {timeline.description}
                    </p>
                    <span
                        className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            timeline.status === 'Segera'
                                ? 'bg-yellow-100 text-yellow-800'
                                : timeline.status === 'Dibuka'
                                  ? 'bg-green-100 text-green-800'
                                  : timeline.status === 'Diproses'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        {timeline.status}
                    </span>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onEdit(timeline.id)}
                    >
                        <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onDelete(timeline.id)}
                    >
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function RegistrationIndex({
    flows,
    requirements,
    timelines,
}: Props) {
    const [deleteFlowId, setDeleteFlowId] = useState<number | null>(null);
    const [deleteRequirementId, setDeleteRequirementId] = useState<
        number | null
    >(null);
    const [deleteTimelineId, setDeleteTimelineId] = useState<number | null>(
        null,
    );
    const [flowItems, setFlowItems] = useState(flows);
    const [umumRequirementItems, setUmumRequirementItems] = useState(
        requirements.filter((r) => r.type === 'umum'),
    );
    const [dokumenRequirementItems, setDokumenRequirementItems] = useState(
        requirements.filter((r) => r.type === 'dokumen'),
    );
    const [timelineItems, setTimelineItems] = useState(timelines);

    // Flow form states
    const [showFlowForm, setShowFlowForm] = useState(false);
    const [editingFlow, setEditingFlow] = useState<
        RegistrationFlow | undefined
    >(undefined);

    // Requirement form states
    const [showRequirementForm, setShowRequirementForm] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState<
        RegistrationRequirement | undefined
    >(undefined);

    // Timeline form states
    const [showTimelineForm, setShowTimelineForm] = useState(false);
    const [editingTimeline, setEditingTimeline] = useState<
        RegistrationTimeline | undefined
    >(undefined);

    const flowSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const umumRequirementSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const dokumenRequirementSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const timelineSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleFlowDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = flowItems.findIndex(
                (item) => item.id === active.id,
            );
            const newIndex = flowItems.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(flowItems, oldIndex, newIndex);
            setFlowItems(newItems);

            // Update order in backend
            const itemsWithOrder = newItems.map((item, index) => ({
                id: item.id,
                order: index,
            }));

            try {
                await axios.post('/registration/flows/reorder', {
                    items: itemsWithOrder,
                });
            } catch (error) {
                console.error('Failed to update order:', error);
                // Revert on error
                setFlowItems(flowItems);
            }
        }
    };

    const handleTimelineDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = timelineItems.findIndex(
                (item) => item.id === active.id,
            );
            const newIndex = timelineItems.findIndex(
                (item) => item.id === over.id,
            );

            const newItems = arrayMove(timelineItems, oldIndex, newIndex);
            setTimelineItems(newItems);

            // Update order in backend
            const itemsWithOrder = newItems.map((item, index) => ({
                id: item.id,
                order: index,
            }));

            try {
                await axios.post('/registration/timelines/reorder', {
                    items: itemsWithOrder,
                });
            } catch (error) {
                console.error('Failed to update order:', error);
                // Revert on error
                setTimelineItems(timelineItems);
            }
        }
    };

    const handleUmumRequirementDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = umumRequirementItems.findIndex(
                (item) => item.id === active.id,
            );
            const newIndex = umumRequirementItems.findIndex(
                (item) => item.id === over.id,
            );

            const newItems = arrayMove(
                umumRequirementItems,
                oldIndex,
                newIndex,
            );
            setUmumRequirementItems(newItems);

            // Combine both types and update order
            const allItems = [...newItems, ...dokumenRequirementItems];
            const itemsWithOrder = allItems.map((item, index) => ({
                id: item.id,
                order: index,
            }));

            try {
                await axios.post('/registration/requirements/reorder', {
                    items: itemsWithOrder,
                });
            } catch (error) {
                console.error('Failed to update order:', error);
                setUmumRequirementItems(umumRequirementItems);
            }
        }
    };

    const handleDokumenRequirementDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = dokumenRequirementItems.findIndex(
                (item) => item.id === active.id,
            );
            const newIndex = dokumenRequirementItems.findIndex(
                (item) => item.id === over.id,
            );

            const newItems = arrayMove(
                dokumenRequirementItems,
                oldIndex,
                newIndex,
            );
            setDokumenRequirementItems(newItems);

            // Combine both types and update order
            const allItems = [...umumRequirementItems, ...newItems];
            const itemsWithOrder = allItems.map((item, index) => ({
                id: item.id,
                order: index,
            }));

            try {
                await axios.post('/registration/requirements/reorder', {
                    items: itemsWithOrder,
                });
            } catch (error) {
                console.error('Failed to update order:', error);
                setDokumenRequirementItems(dokumenRequirementItems);
            }
        }
    };

    const handleDeleteFlow = () => {
        if (deleteFlowId) {
            router.delete(`/registration/flow/${deleteFlowId}`);
            setDeleteFlowId(null);
        }
    };

    const handleDeleteRequirement = () => {
        if (deleteRequirementId) {
            router.delete(`/registration/requirement/${deleteRequirementId}`);
            setDeleteRequirementId(null);
        }
    };

    const handleDeleteTimeline = () => {
        if (deleteTimelineId) {
            router.delete(`/registration/timeline/${deleteTimelineId}`);
            setDeleteTimelineId(null);
        }
    };

    // Flow handlers
    const handleCreateFlow = () => {
        setEditingFlow(undefined);
        setShowFlowForm(true);
    };

    const handleEditFlow = (flow: RegistrationFlow) => {
        setEditingFlow(flow);
        setShowFlowForm(true);
    };

    const handleCancelFlow = () => {
        setShowFlowForm(false);
        setEditingFlow(undefined);
    };

    // Requirement handlers
    const handleCreateRequirement = () => {
        setEditingRequirement(undefined);
        setShowRequirementForm(true);
    };

    const handleEditRequirement = (requirement: RegistrationRequirement) => {
        setEditingRequirement(requirement);
        setShowRequirementForm(true);
    };

    const handleCancelRequirement = () => {
        setShowRequirementForm(false);
        setEditingRequirement(undefined);
    };

    // Timeline handlers
    const handleCreateTimeline = () => {
        setEditingTimeline(undefined);
        setShowTimelineForm(true);
    };

    const handleEditTimeline = (timeline: RegistrationTimeline) => {
        setEditingTimeline(timeline);
        setShowTimelineForm(true);
    };

    const handleCancelTimeline = () => {
        setShowTimelineForm(false);
        setEditingTimeline(undefined);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Alur Pendaftaran */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <GitBranch className="h-5 w-5 text-primary" />
                                    <div>
                                        <CardTitle className="text-base">
                                            Alur Pendaftaran
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {flows.length} alur
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button size="sm" onClick={handleCreateFlow}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Flow Form */}
                            {showFlowForm && (
                                <FlowForm
                                    flow={editingFlow}
                                    onSuccess={handleCancelFlow}
                                    onCancel={handleCancelFlow}
                                />
                            )}

                            <div className="space-y-3">
                                {flowItems.length === 0 ? (
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        Belum ada data
                                    </p>
                                ) : (
                                    <DndContext
                                        sensors={flowSensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleFlowDragEnd}
                                    >
                                        <SortableContext
                                            items={flowItems.map(
                                                (item) => item.id,
                                            )}
                                            strategy={
                                                verticalListSortingStrategy
                                            }
                                        >
                                            {flowItems.map((flow, index) => (
                                                <div
                                                    key={flow.id}
                                                    className="flex items-start gap-2"
                                                >
                                                    <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <SortableFlowItem
                                                            flow={flow}
                                                            onEdit={() =>
                                                                handleEditFlow(
                                                                    flow,
                                                                )
                                                            }
                                                            onDelete={(id) =>
                                                                setDeleteFlowId(
                                                                    id,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Syarat Pendaftaran */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckSquare className="h-5 w-5 text-primary" />
                                    <div>
                                        <CardTitle className="text-base">
                                            Syarat Pendaftaran
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {requirements.length} syarat
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleCreateRequirement}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Requirement Form */}
                            {showRequirementForm && (
                                <RequirementForm
                                    requirement={editingRequirement}
                                    onSuccess={handleCancelRequirement}
                                    onCancel={handleCancelRequirement}
                                />
                            )}

                            <div className="space-y-6">
                                {/* Persyaratan Umum */}
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-primary">
                                        Persyaratan Umum
                                    </h3>
                                    <div className="space-y-3">
                                        {umumRequirementItems.length === 0 ? (
                                            <p className="py-4 text-center text-sm text-muted-foreground">
                                                Belum ada data
                                            </p>
                                        ) : (
                                            <DndContext
                                                sensors={umumRequirementSensors}
                                                collisionDetection={
                                                    closestCenter
                                                }
                                                onDragEnd={
                                                    handleUmumRequirementDragEnd
                                                }
                                            >
                                                <SortableContext
                                                    items={umumRequirementItems.map(
                                                        (item) => item.id,
                                                    )}
                                                    strategy={
                                                        verticalListSortingStrategy
                                                    }
                                                >
                                                    {umumRequirementItems.map(
                                                        (
                                                            requirement,
                                                            index,
                                                        ) => (
                                                            <div
                                                                key={
                                                                    requirement.id
                                                                }
                                                                className="flex items-start gap-2"
                                                            >
                                                                <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                                    {index + 1}
                                                                </span>
                                                                <div className="flex-1">
                                                                    <SortableRequirementItem
                                                                        requirement={
                                                                            requirement
                                                                        }
                                                                        onEdit={() =>
                                                                            handleEditRequirement(
                                                                                requirement,
                                                                            )
                                                                        }
                                                                        onDelete={(
                                                                            id,
                                                                        ) =>
                                                                            setDeleteRequirementId(
                                                                                id,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </SortableContext>
                                            </DndContext>
                                        )}
                                    </div>
                                </div>

                                {/* Dokumen yang Diperlukan */}
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-primary">
                                        Dokumen yang Diperlukan
                                    </h3>
                                    <div className="space-y-3">
                                        {dokumenRequirementItems.length ===
                                        0 ? (
                                            <p className="py-4 text-center text-sm text-muted-foreground">
                                                Belum ada data
                                            </p>
                                        ) : (
                                            <DndContext
                                                sensors={
                                                    dokumenRequirementSensors
                                                }
                                                collisionDetection={
                                                    closestCenter
                                                }
                                                onDragEnd={
                                                    handleDokumenRequirementDragEnd
                                                }
                                            >
                                                <SortableContext
                                                    items={dokumenRequirementItems.map(
                                                        (item) => item.id,
                                                    )}
                                                    strategy={
                                                        verticalListSortingStrategy
                                                    }
                                                >
                                                    {dokumenRequirementItems.map(
                                                        (
                                                            requirement,
                                                            index,
                                                        ) => (
                                                            <div
                                                                key={
                                                                    requirement.id
                                                                }
                                                                className="flex items-start gap-2"
                                                            >
                                                                <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                                    {index + 1}
                                                                </span>
                                                                <div className="flex-1">
                                                                    <SortableRequirementItem
                                                                        requirement={
                                                                            requirement
                                                                        }
                                                                        onEdit={() =>
                                                                            handleEditRequirement(
                                                                                requirement,
                                                                            )
                                                                        }
                                                                        onDelete={(
                                                                            id,
                                                                        ) =>
                                                                            setDeleteRequirementId(
                                                                                id,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </SortableContext>
                                            </DndContext>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Pendaftaran */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <div>
                                        <CardTitle className="text-base">
                                            Timeline Pendaftaran
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {timelines.length} timeline
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleCreateTimeline}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Timeline Form */}
                            {showTimelineForm && (
                                <TimelineForm
                                    timeline={editingTimeline}
                                    onSuccess={handleCancelTimeline}
                                    onCancel={handleCancelTimeline}
                                />
                            )}

                            <div className="space-y-3">
                                {timelineItems.length === 0 ? (
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        Belum ada data
                                    </p>
                                ) : (
                                    <DndContext
                                        sensors={timelineSensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleTimelineDragEnd}
                                    >
                                        <SortableContext
                                            items={timelineItems.map(
                                                (item) => item.id,
                                            )}
                                            strategy={
                                                verticalListSortingStrategy
                                            }
                                        >
                                            {timelineItems.map(
                                                (timeline, index) => (
                                                    <div
                                                        key={timeline.id}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                            {index + 1}
                                                        </span>
                                                        <div className="flex-1">
                                                            <SortableTimelineItem
                                                                timeline={
                                                                    timeline
                                                                }
                                                                onEdit={() =>
                                                                    handleEditTimeline(
                                                                        timeline,
                                                                    )
                                                                }
                                                                onDelete={(
                                                                    id,
                                                                ) =>
                                                                    setDeleteTimelineId(
                                                                        id,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </SortableContext>
                                    </DndContext>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Flow Dialog */}
            <AlertDialog
                open={deleteFlowId !== null}
                onOpenChange={(open) => !open && setDeleteFlowId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data alur
                            pendaftaran akan dihapus secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteFlow}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Requirement Dialog */}
            <AlertDialog
                open={deleteRequirementId !== null}
                onOpenChange={(open) => !open && setDeleteRequirementId(null)}
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
                        <AlertDialogAction onClick={handleDeleteRequirement}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Timeline Dialog */}
            <AlertDialog
                open={deleteTimelineId !== null}
                onOpenChange={(open) => !open && setDeleteTimelineId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data timeline
                            pendaftaran akan dihapus secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteTimeline}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

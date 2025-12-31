export interface RegistrationFlow {
    id: number;
    title: string;
    description: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface RegistrationRequirement {
    id: number;
    description: string;
    type: 'umum' | 'dokumen';
    order: number;
    created_at: string;
    updated_at: string;
}

export interface RegistrationTimeline {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    status: 'Segera' | 'Dibuka' | 'Diproses' | 'Ditutup';
    order: number;
    created_at: string;
    updated_at: string;
}

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export interface UserManagement {
  id: number;
  name: string;
  email: string;
  gender: 'L' | 'P' | null;
  role: 'admin' | 'panpel' | 'casis';
  created_at: string;
}

interface GetColumnsProps {
  onEdit: (user: UserManagement) => void;
  onDelete: (user: UserManagement) => void;
}

export function getUserColumns({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<UserManagement>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Nama',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'gender',
      header: 'Jenis Kelamin',
      cell: ({ row }) => {
        const gender = row.getValue('gender') as string | null;
        return (
          <div>
            {gender === 'L' ? 'Laki-laki' : gender === 'P' ? 'Perempuan' : '-'}
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        const roleColors = {
          admin: 'bg-blue-100 text-blue-800',
          panpel: 'bg-purple-100 text-purple-800',
          casis: 'bg-green-100 text-green-800',
        };
        const roleLabels = {
          admin: 'Admin',
          panpel: 'Panpel',
          casis: 'Casis',
        };
        return (
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {roleLabels[role as keyof typeof roleLabels] || role}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}

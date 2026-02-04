import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import userRoutes from '@/routes/users';
import { UserManagement } from '@/components/dashboard/user-columns';
import { UserEditDialog } from '@/components/dashboard/user-edit-dialog';
import { UserDeleteDialog } from '@/components/dashboard/user-delete-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manajemen Akun',
    href: userRoutes.index().url,
  },
];

interface Props {
  users: UserManagement[];
  [key: string]: unknown;
}

export default function AccountManagement() {
  const { users } = usePage<Props>().props;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserManagement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    gender: '',
    role: '',
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: UserManagement) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      gender: user.gender || '',
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (user: UserManagement) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitEdit = () => {
    if (!selectedUser) return;

    router.put(
      userRoutes.update.url(selectedUser.id),
      editForm,
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          setSelectedUser(null);
        },
      }
    );
  };

  const submitDelete = () => {
    if (!selectedUser) return;

    router.delete(userRoutes.destroy.url(selectedUser.id), {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedUser(null);
      },
    });
  };

  const getRoleBadge = (role: string) => {
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
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {roleLabels[role as keyof typeof roleLabels] || role}
      </span>
    );
  };

  const getGenderLabel = (gender: string | null) => {
    if (gender === 'L') return 'Laki-laki';
    if (gender === 'P') return 'Perempuan';
    return '-';
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Akun" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manajemen Akun</CardTitle>
                <CardDescription>
                  Kelola pengguna dan hak akses mereka
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Cari nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'Tidak ada user yang cocok dengan pencarian.'
                      : 'Belum ada user terdaftar.'}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {user.name}
                            </h3>
                            {getRoleBadge(user.role)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Email:</span>{' '}
                              {user.email}
                            </div>
                            <div>
                              <span className="font-medium">
                                Jenis Kelamin:
                              </span>{' '}
                              {getGenderLabel(user.gender)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(user)}
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

            {filteredUsers.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Menampilkan {filteredUsers.length} dari {users.length} user
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <UserEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={selectedUser}
        formData={editForm}
        onFormChange={handleFormChange}
        onSubmit={submitEdit}
      />

      <UserDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={selectedUser}
        onConfirm={submitDelete}
      />
    </AppLayout>
  );
}

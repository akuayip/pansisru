<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'gender', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/acc-manage', [
            'users' => $users
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'role' => 'required|in:admin,panpel,casis',
        ]);

        $user->update($validated);

        return back()->with('success', 'User berhasil diupdate');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting own account
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Tidak dapat menghapus akun sendiri');
        }

        $user->delete();

        return back()->with('success', 'User berhasil dihapus');
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'gender' => 'L',
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'panpel@example.com'],
            [
                'name' => 'Panitia Penerimaan',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'gender' => 'L',
                'role' => 'panpel',
            ]
        );

        User::updateOrCreate(
            ['email' => 'casis@example.com'],
            [
                'name' => 'Calon Siswa',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'gender' => 'P',
                'role' => 'casis',
            ]
        );
    }
}

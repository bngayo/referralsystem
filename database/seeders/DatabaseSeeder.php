<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Clinic;
use App\Models\Contact;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $clinic = Clinic::create([
            'name' => 'St Judes Medical Center',
            'phone' => '0706298700',
            'email' => 'stjudesmedicalcentre@gmail.com',
            'address' => 'Mwangaza street, Komarock Estate Sector 3A Nairobi',
            'location' => 'Nairobi'
        ]);

        User::factory()->create([
            'clinic_id' => $clinic->id,
            'first_name' => 'System',
            'last_name' => 'Admin',
            'email' => 'admin@stjudemedicalcentre.com',
            'phone' => '0721000000',
            'owner' => true,
        ]);

        // User::factory()->count(2)->create([
        //     'clinic_id' => $clinic->id
        // ]);
    }
}

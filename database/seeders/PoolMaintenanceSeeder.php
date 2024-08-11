<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Pool;
use App\Models\MaintenanceTask;
use Illuminate\Database\Seeder;

class PoolMaintenanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pool = Pool::create([
            'name' => 'Piscina Blue',
            'location' => '1 Mai',
        ]);

        MaintenanceTask::create([
            'task_name' => 'Filter Cleaning',
            'details' => 'Clean the pool filters',
            'pool_id' => $pool->id,
        ]);

         $pool2 = Pool::create([
            'name' => 'Piscina Gold',
            'location' => 'Craiovita Noua',
        ]);

        MaintenanceTask::create([
            'task_name' => 'Tile Scrubbing',
            'details' => 'Scrub and clean the pool tiles',
            'pool_id' => $pool2->id,
        ]);
    }
}

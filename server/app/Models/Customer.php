<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone_number', 'registration_date', 'address', 'score'];

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($customer) {
            // Check if registration_date attribute is dirty (changed)
            if ($customer->isDirty('registration_date')) {
                // Set registration_date to CURRENT_TIMESTAMP
                $customer->registration_date = DB::raw('CURRENT_TIMESTAMP');
            }
        });
    }
}
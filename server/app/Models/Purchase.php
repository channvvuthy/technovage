<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'amount', 'item_name'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}

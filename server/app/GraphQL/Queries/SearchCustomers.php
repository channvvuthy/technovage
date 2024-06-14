<?php

namespace App\GraphQL\Queries;
use App\Models\Customer;

final class SearchCustomers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = $args['query'];

        // Perform search query
        $customers = Customer::where('name', 'like', "%$query%")
                             ->orWhere('phone_number', 'like', "%$query%")
                             ->get();

        return $customers;
    }
}

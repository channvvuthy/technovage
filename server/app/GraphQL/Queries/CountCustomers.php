<?php

namespace App\GraphQL\Queries;

use App\Models\Customer;

final class CountCustomers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return Customer::count();
    }
}

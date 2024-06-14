<?php

namespace App\GraphQL\Queries;

use App\Models\Purchase;

final class CountPurchases
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return Purchase::count();
    }
}

<?php

namespace App\GraphQL\Mutations;
use App\Models\Customer;

final class UpdateCustomerScore
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $customerId = $args['id'];
        $score = $args['score'];
    
        // Retrieve the customer
        $customer = Customer::find($customerId);
    
        if (!$customer) {
            throw new \Exception("Customer with ID {$customerId} not found");
        }
    
        // Update the score
        $oldScore = $customer->score;
        $newScore = $score + $oldScore;
        $customer->score = $newScore;
    
        // Save the changes
        $customer->save();
    
        // Return the updated score
        return $customer->score;
    }
    
}

<?php
namespace App\Providers;

use App\GraphQL\Queries\SearchCustomers;
use Illuminate\Support\ServiceProvider;

class GraphQLServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Register the searchCustomers query resolver
        $this->app->singleton('graphql.searchCustomers', function () {
            return new SearchCustomers();
        });
    }

    public function register()
    {
        //
    }
}

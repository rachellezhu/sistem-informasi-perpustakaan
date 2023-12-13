<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        URL::forceScheme('https');
        config([
            'app.locale' => 'id',
            'app.fallback_locale' => 'id',
        ]);
        Carbon::setLocale('id');
        Carbon::setFallbackLocale('id');
    }
}

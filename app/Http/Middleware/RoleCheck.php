<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect('/');
        }
        if (!Auth::user()->is_admin) {
            return response()->json(['Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi admin atau kepala sekolah']);
        }
        return $next($request);
    }
}

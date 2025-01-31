<?php
namespace App\Http\Controllers;

use App\Models\Tariff;
use Illuminate\Http\JsonResponse;

class TariffController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Tariff::all());
    }
}

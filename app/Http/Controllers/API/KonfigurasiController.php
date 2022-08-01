<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KonfigurasiController extends Controller
{
    public function index()
    {
        $data = DB::table('konfigurasi')->first();

        return response()->json($data);
    }
}

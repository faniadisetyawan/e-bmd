<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the jungle !']);
});

Route::group(['prefix' => 'konfigurasi'], function () {
    Route::get('/', 'API\KonfigurasiController@index');
});

Route::group(['prefix' => 'auth'], function () {
    Route::get('/me', 'API\AuthController@me');
    Route::post('/login', 'API\AuthController@login');
    Route::post('/logout', 'API\AuthController@logout');
    Route::post('/refresh', 'API\AuthController@refresh');
});

Route::group(['prefix' => 'refer'], function () {
    Route::get('/', 'API\ReferController@index');

    Route::group(['prefix' => 'skpd'], function () {
        Route::get('/pengguna', 'API\RefSkpdController@pengguna');
        Route::get('/{kode}', 'API\RefSkpdController@show');
    });

    Route::group(['prefix' => 'pembukuan'], function () {
        Route::get('/', 'API\RefPembukuanController@index');
    });
});

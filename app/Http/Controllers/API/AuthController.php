<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'secretRegister']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['username', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            $reqUsername = $request->input('username');
            $reqPassword = $request->input('password');
            $findUser = User::where('username', $reqUsername)->first();

            if (!$findUser) {
                return response()->json(['message' => 'User tidak ditemukan !'], 401);
            }
            
            if (Hash::check($reqPassword, $findUser->password) === FALSE) {
                return response()->json(['message' => 'Password salah !'], 401);
            }
        }

        return $this->_respondWithToken($token);
    }

    public function me()
    {
        $data = User::with(['pegawai.skpd', 'pegawai.jabatan'])->find(Auth::id());

        return response()->json($data);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->_respondWithToken(Auth::refresh());
    }

    public function secretRegister(Request $request)
    {
        $request->validate([
            'id_pegawai' => ['required'],
            'username' => ['required', 'max:100'],
            'password' => ['required'],
        ]);

        $data = new User;
        $data->id_pegawai = $request->input('id_pegawai');
        $data->username = $this->_generateUsername($request->input('username'));
        $data->password = Hash::make($request->input('password'));
        $data->save();

        return response()->json(['message' => 'User berhasil ditambahkan.', 'data' => $data]);
    }
}

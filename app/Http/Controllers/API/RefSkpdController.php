<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\RefSkpd;

class RefSkpdController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    private function _buildTree($data, $parentId = '0') {
        $branch = [];

        foreach ($data as $element) {
            if (strval($element->kode_parent) === strval($parentId)) {
                $children = $this->_buildTree($data, $element->kode);
                if ($children) {
                    $element->children = $children;
                }
                
                $branch[] = $element;
            }
        }

        return $branch;
    }

    public function pengguna()
    {
        $data = RefSkpd::orderBy('kode')->get();

        $output = $this->_buildTree($data);

        return response()->json($output);
    }

    public function kuasaPengguna($kodePengguna)
    {
    }

    public function subKuasaPengguna($kodeKuasaPengguna)
    {
    }

    public function show($kode)
    {
        $data = RefSkpd::find($kode);

        return response()->json($data);
    }
}

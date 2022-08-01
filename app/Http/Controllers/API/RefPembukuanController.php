<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\RefPembukuan;

class RefPembukuanController extends Controller
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

    public function index()
    {
        $source = RefPembukuan::where('is_transaction', TRUE)->orderBy('kode')->get();

        $data = $this->_buildTree($source);

        return response()->json($data);
    }
}

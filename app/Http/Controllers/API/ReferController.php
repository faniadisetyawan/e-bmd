<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\RefPembukuan;

class ReferController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    private function _buildTreeRefPembukuan($data, $parentId = '0') {
        $branch = [];

        foreach ($data as $element) {
            if (strval($element->kode_parent) === strval($parentId)) {
                $children = $this->_buildTreeRefPembukuan($data, $element->kode);
                if ($children) {
                    $element->children = $children;
                }
                
                $branch[] = $element;
            }
        }

        return $branch;
    }

    private function _refPembukuan()
    {
        $source = RefPembukuan::select(
                'kode',
                DB::raw('uraian AS label'),
                'kode_parent',
                DB::raw("CONCAT('/pembukuan',url) AS url")
            )
            ->where('is_transaction', TRUE)
            ->orderBy('kode')
            ->get();

        return $this->_buildTreeRefPembukuan($source);
    }

    private function _navigation()
    {
        $pembukuan = $this->_refPembukuan();

        return array(
            [
                'label' => 'Dashboard',
                'url' => '/dashboard'
            ],
            [
                'label' => 'Master Data',
                'url' => '/master',
                'children' => array(
                    [
                        'label' => 'Data SKPD',
                        'url' => '/master/skpd'
                    ],
                    [
                        'label' => 'Data Pegawai',
                        'url' => '/master/pegawai'
                    ],
                    [
                        'label' => 'Data User',
                        'url' => '/master/users'
                    ],
                    [
                        'label' => 'Saldo Awal',
                        'url' => '/master/saldo-awal',
                        'children' => array(
                            [
                                'label' => 'Persediaan',
                                'url' => '/master/saldo-awal/persediaan'
                            ],
                            [
                                'label' => 'Tanah',
                                'url' => '/master/saldo-awal/tanah'
                            ],
                            [
                                'label' => 'Peralatan dan Mesin',
                                'url' => '/master/saldo-awal/peralatan-mesin'
                            ],
                            [
                                'label' => 'Gedung dan Bangunan',
                                'url' => '/master/saldo-awal/gedung-bangunan'
                            ],
                            [
                                'label' => 'Jalan, Irigasi dan Jaringan',
                                'url' => '/master/saldo-awal/jalan-irigasi-jaringan'
                            ],
                            [
                                'label' => 'Aset Tetap Lainnya',
                                'url' => '/master/saldo-awal/aset-tetap-lainnya'
                            ],
                            [
                                'label' => 'Konstruksi Dalam Pengerjaan',
                                'url' => '/master/saldo-awal/kdp'
                            ],
                            [
                                'label' => 'Kemitraan Pihak Ketiga',
                                'url' => '/master/saldo-awal/kemitraan-pihak-ketiga'
                            ],
                            [
                                'label' => 'Aset Tak Berwujud',
                                'url' => '/master/saldo-awal/aset-tak-berwujud'
                            ]
                        )
                    ]
                )
            ],
            [
                'label' => 'Pembukuan',
                'url' => '/pembukuan',
                'children' => $pembukuan
            ],
            [
                'label' => 'Inventarisasi',
                'url' => '/inventarisasi'
            ],
            [
                'label' => 'Pelaporan',
                'url' => '/pelaporan',
                'children' => array(
                    [
                        'label' => 'Rekonsiliasi Aset',
                        'url' => '/pelaporan/rekonsiliasi'
                    ]
                )
            ]
        );
    }

    public function index()
    {
        return response()->json([
            'navigation' => $this->_navigation()
        ]);
    }
}

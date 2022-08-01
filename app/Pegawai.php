<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pegawai extends Model
{
    use SoftDeletes;

    protected $table = 'pegawai';

    protected $fillable = [
        'kode_skpd',
        'kode_jabatan',
        'nama',
        'nip',
        'golongan',
        'no_hp',
        'foto',
        'scan_ttd',
        'id_user'
    ];

    public function skpd()
    {
        return $this->belongsTo('App\RefSkpd', 'kode_skpd');
    }

    public function jabatan()
    {
        return $this->belongsTo('App\RefJabatan', 'kode_jabatan');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'id_user')->withTrashed();
    }
}

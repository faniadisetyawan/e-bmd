<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefKodefikasi extends Model
{
    protected $table = 'ref_kodefikasi';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'tipe', 'masa_manfaat', 'nilai_kapitalisasi'];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefKapitalisasi extends Model
{
    protected $table = 'ref_kapitalisasi';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'deskripsi'];
}

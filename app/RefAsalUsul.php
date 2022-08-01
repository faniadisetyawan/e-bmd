<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefAsalUsul extends Model
{
    protected $table = 'ref_asal_usul';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'deskripsi'];
}

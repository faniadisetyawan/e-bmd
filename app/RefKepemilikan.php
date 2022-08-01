<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefKepemilikan extends Model
{
    protected $table = 'ref_kepemilikan';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'deskripsi'];
}

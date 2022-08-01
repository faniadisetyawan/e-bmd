<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefSkpd extends Model
{
    protected $table = 'ref_skpd';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'nama'];
}

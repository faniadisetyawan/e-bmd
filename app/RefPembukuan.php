<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefPembukuan extends Model
{
    protected $table = 'ref_pembukuan';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'deskripsi'];
}

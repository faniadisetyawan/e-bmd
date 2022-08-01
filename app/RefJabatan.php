<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RefJabatan extends Model
{
    protected $table = 'ref_jabatan';

    protected $primaryKey = 'kode';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['kode', 'uraian', 'deskripsi'];
}

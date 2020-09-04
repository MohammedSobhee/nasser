<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceProvider extends Model
{
    //
    use SoftDeletes;


    protected $fillable = [
        'user_id', 'idno', 'idno_file', 'skill', 'skill_file', 'licensed', 'licensed_file',
        'bio', 'address', 'latitude', 'longitude', 'service_provider_type_id'
    ];

    protected $casts = ['service_provider_type_id' => 'integer'];

    public function getIdnoFileAttribute($value)
    {
        if (isset($value))
            return url('assets/upload') . '/' . $value;
    }

    public function getSkillFileAttribute($value)
    {
        if (isset($value))
            return url('assets/upload') . '/' . $value;
    }

    public function getLicensedFileAttribute($value)
    {
        if (isset($value))
            return url('assets/upload') . '/' . $value;
    }
}

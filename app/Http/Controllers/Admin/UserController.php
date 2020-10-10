<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Repositories\Eloquents\UserEloquent;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    private $user;

    public function __construct(UserEloquent $user)
    {
//        parent::__construct();
        $this->user = $user;
    }

    public function index()
    {
        $data = [
            'title' => 'المستخدمين',
            'icon' => 'icon-users',
        ];
        return view(admin_vw() . '.users.index', $data);
    }

    public function providers()
    {
        $data = [
            'title' => 'مزودي الخدمات',
            'icon' => 'icon-users',
        ];
        return view(admin_vw() . '.users.providers', $data);
    }

    public function anyData($type)
    {
        return $this->user->anyData($type);
    }

    public function userActive(Request $request)
    {
        return $this->user->userActive($request->only('user_id'));
    }

    public function verifyPhone(Request $request)
    {
        return $this->user->verifyPhone($request->only('user_id'));
    }

    // view Add new package modal by super admin
    public function createProvider()
    {
        return $this->user->provider_create_mdl();
    }


    public function profile($id)
    {
        $user = $this->user->getById($id);

        if ($user->type == 'service_provider') {
            $data = [
                'title' => 'عرض تفاصيل مزود الخدمة',
                'icon' => 'icon-users',
                'user' => $user,
            ];
            return view(admin_vw() . '.users.view-provider', $data);
        } else {
            $data = [
                'title' => 'عرض تفاصيل المستخدم',
                'icon' => 'icon-users',
                'user' => $user,
            ];
            return view(admin_vw() . '.users.view-user', $data);

        }

    }

    public function confirmUpdateProvider(Request $request, $id)
    {
        return $this->user->confirmUpdateProvider($request->all(), $id);
    }

    public function rejectUpdateProvider(Request $request, $id)
    {
        return $this->user->rejectUpdateProvider($request->all(), $id);
    }

    public function export()
    {
//        return $this->user->export();
    }
}

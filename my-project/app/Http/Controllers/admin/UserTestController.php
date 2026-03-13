<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserTestController extends Controller
{
    // GET /users
    public function index()
    {
        $users = Users::all();
        return response()->json($users);
    }

    // GET /users/1
    public function show($id)
    {
        $users = Users::findOrFail($id);
        return response()->json($users);
    }

    // POST /users
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3|max:255',
        ]);

        $users = Users::create($data);

        return response()->json([
            'message' => 'Thêm USERS thành công',
            'data' => $users
        ]);
    }

    // PUT /users/1
    public function update(Request $request, $id)
    {
        $users = Users::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|min:3|max:255',
        ]);

        $users->update($data);

        return response()->json([
            'message' => 'Cập nhật thành công',
            'data' => $users
        ]);
    }

    // DELETE /users/1
    public function destroy($id)
    {
        $users = Users::findOrFail($id);

        $users->delete();

        return response()->json([
            'message' => 'Xóa USERS thành công'
        ]);
    }
}
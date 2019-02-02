<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getinfo', 'InfoController@getInfo');
Route::put('/saveinfo', 'InfoController@saveInfo');
Route::get('/info/image', 'InfoController@getImage');
Route::post('/info/saveImage', 'InfoController@saveImage');
Route::get('/getAbout', 'InfoController@getAbout');
Route::put('/saveSkill', 'InfoController@saveSkill');
Route::post('/deleteSkill', 'InfoController@removeSkill');
Route::put('/saveExp', 'InfoController@SaveExp');
Route::post('/deleteExp', 'InfoController@removeExp');
Route::get('/getProjects', 'InfoController@getProjects');
Route::put('/saveProject', 'InfoController@saveProject');
Route::post('/deleteProject', 'InfoController@removeProject');
Route::get('/getContacts', 'InfoController@getContacts');
Route::put('/saveContact', 'InfoController@saveContact');


Route::get('/auth', 'Auth\LoginController@isLogged');
Route::post('/auth', 'Auth\LoginController@authenticate');
Route::get('/auth/logout', 'Auth\LoginController@logout');


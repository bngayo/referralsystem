<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::get('users')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
Route::get('users/create')->name('users.create')->uses('UsersController@create')->middleware('auth');
Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations
Route::get('organizations')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Contacts
Route::get('contacts')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');


// Clinics
Route::get('clinics')->name('clinics')->uses('ClinicsController@index')->middleware('remember', 'auth');
Route::get('clinics/create')->name('clinics.create')->uses('ClinicsController@create')->middleware('auth');
Route::post('clinics')->name('clinics.store')->uses('ClinicsController@store')->middleware('auth');
Route::get('clinics/{organization}/edit')->name('clinics.edit')->uses('ClinicsController@edit')->middleware('auth');
Route::put('clinics/{organization}')->name('clinics.update')->uses('ClinicsController@update')->middleware('auth');
Route::delete('clinics/{organization}')->name('clinics.destroy')->uses('ClinicsController@destroy')->middleware('auth');
Route::put('clinics/{organization}/restore')->name('clinics.restore')->uses('ClinicsController@restore')->middleware('auth');

// Clinics
Route::get('patients')->name('patients')->uses('PatientsController@index')->middleware('remember', 'auth');
Route::get('patients/create')->name('patients.create')->uses('PatientsController@create')->middleware('auth');
Route::post('patients')->name('patients.store')->uses('PatientsController@store')->middleware('auth');
Route::get('patients/{organization}/edit')->name('patients.edit')->uses('PatientsController@edit')->middleware('auth');
Route::put('patients/{organization}')->name('patients.update')->uses('PatientsController@update')->middleware('auth');
Route::delete('patients/{organization}')->name('patients.destroy')->uses('PatientsController@destroy')->middleware('auth');
Route::put('patients/{organization}/restore')->name('patients.restore')->uses('PatientsController@restore')->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});

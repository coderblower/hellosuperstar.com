<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () { return view('home'); })->name('home');
Route::get('/about-us', function () { return view('about'); })->name('about');
Route::get('/our-service', function () { return view('service'); })->name('service');
Route::get('/our-star-clients', function () { return view('clients'); })->name('clients');
Route::get('/our-star-team', function () { return view('team'); })->name('team');
Route::get('/contact-us', function () { return view('contact'); })->name('contact');

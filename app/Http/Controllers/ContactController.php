<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\SendContact;

class ContactController extends Controller
{
    public function contact(Request $request){
        $valid = \Validator::make($request->json()->all(),[
            'name'      =>  'required|string',
            'email'     =>  'required|email',
            'message'   =>  'required|string'
        ]);
        if($valid->fails()){
            return \Response::json($valid->errors(),400);
        }
        Mail::to('ask@webdevelopmentsolutions.net')->send(new SendContact($request->json()->all()));
        return \Response::json(['msg' => [0 => 'Thank you for your enquiry, we will get back to you shortly']],200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Info;
use App\Experience;
use App\Skill;
use App\Project;
use App\Contact;

class InfoController extends Controller
{

    private function newInfo() {
        $info = new Info();
        $info->first_name = "John";
        $info->last_name = "Doe";
        $info->title = "Best Developer";
        $info->email = "john.doe@gmail.com";
        $info->phone = "01234567891";
        $info->facebook = "https://www.facebook.com";
        $info->twitter = "https://www.twitter.com";
        $info->github = "https://www.github.com";
        $info->linkedin = "https://www.linkedin.com";
        $info->description = "A website, mobile developer";
        $info->save();
        return $info;
    }
    public function getInfo() {
        $info = Info::get()->first();
        if(!$info) {
            $info = $this->newInfo();
        }


        return $info->toJson();
    }

    public function getImage() {
        $info = Info::get()->first();
        if(!$info) {
            return ['image' => ''];
        }
        return ['image' => $info->profile_path];
    }
    public function saveInfo(Request $request) {
        if(session('user') != null) {
            $info = Info::get()->first();
            $info->update($request->all());
            return response('Success', 200);
         } else {
            return response('Failed', 401);
         }
    }

    public function saveImage(Request $request) {
        if($request->hasFile('image')) {
            $info = Info::get()->first();
            if(!$info) return 401;
            $image = $request->file('image');
            $name = 'me.jpg';
            $dest = public_path('/imgs');
            $image->move($dest, $name); 
            return response('Success', 200);
        } else {
           return response('Failed', 401);
        }
    }

    public function getAbout() {
        $info = Info::get()->first();
        if(!$info) {
            $info = $this->newInfo();
        }

        $response = [
            "description" => $info->description,
        ];        

        $response["exp"] = Experience::all()->toJson();
        $response["skills"] = Skill::all()->toJson();

        return $response;
    }

    public function saveSkill(Request $request) {
        if(session('user') != null) {
           $skill = new Skill();
           $skill->name = $request->get('name');
           $skill->save();
           return $skill->id;
         } else {
            return response('Failed', 401);
         }
    }

    public function removeSkill(Request $request) {
        if(session('user') != null) {
            $deletedRows = Skill::where('id', '=', $request->get('id'))->delete();
            if($deletedRows) {
                return response('Success', 200);
            }
            return response('Failed', 404);
         } else {
            return response('Failed', 401);
         }
    }

    public function saveExp(Request $request) {
        if(session('user') != null) {
            $exp = new Experience();
            $exp->name = $request->get('name');
            $exp->from = $request->get('from');
            $exp->to = $request->get('to');
            $exp->description = $request->get('description');
            $exp->save();
            return $exp->id;
         } else {
            return response('Failed', 401);
         }
    }

    public function removeExp(Request $request) {
        if(session('user') != null) {
            $deletedRows = Experience::where('id', '=', $request->get('id'))->delete();
            if($deletedRows) {
                return response('Success', 200);
            }
            return response('Failed', 404);
         } else {
            return response('Failed', 401);
         }
    }

    public function getProjects() {
        return Project::all()->toJson();
    }

    public function saveProject(Request $request) {
        if(session('user') != null) {
            $project = new Project();
            $project->name = $request->get('name');
            $project->description = $request->get('description');
            $project->languages = $request->get('languages');
            $project->save();
    
            return $project->id;
         } else {
            return response('Failed', 401);
         }
       
    }

    public function removeProject(Request $request) {
        if(session('user') != null) {
            $deletedRows = Project::where('id', '=', $request->get('id'))->delete();
            if($deletedRows) {
                return response('Success', 200);
            }
            return response('Failed', 404);
         } else {
            return response('Failed', 401);
         }
    }

    public function getContacts() {
        $info = Info::get()->first();
        if(!$info) {
            $info = $this->newInfo();
        }

        $contact = Contact::get()->first();
        if(!$contact) {
            $contact = new Contact();
            $contact->email_text = "Contact me via email at";
            $contact->contact_phone_text = "Contact me via phone at";
            $contact->footer_text = "Nothing";
            $contact->save();
        }

        $response = [
            "email" => $info->email,
            "phone" => $info->phone,
            "email_title" => $contact->email_text,
            "phone_text" => $contact->contact_phone_text,
        ];

        return $response;
    }

    public function saveContact(Request $request) {
        if(session('user') != null) {
            $type = $request->get('type');
            $contact = Contact::get()->first();
            $info = Info::get()->first();
            if(!$info || !$contact) {
                return response('Failed', 404);
            }
            if($type === 'phone') {
                $contact->contact_phone_text = $request->get('title_value');
                $info->phone = $request->get('contact_value');
            } else if($type === 'email') {
                $contact->email_text = $request->get('title_value');
                $info->email = $request->get('contact_value');
            } else {
                return response('Failed', 401);
            }
            $contact->save();
            $info->save();
            return response('Success', 200);
         } else {
            return response('Failed', 401);
         }
    }


}

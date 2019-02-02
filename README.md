# Laravel - React Portfolio

A web portfolio built with with Laravel and react

Most people don't have time creating their own portfolios, and just want something to use out of the box, and as a developer I didn't want to use wordpress or wix etc so I have created this project to be able to have a quick and a simple portfolio to show my work on

The UI of the website is inspired by the tutorial of the channel Traversy Media on youtube called Responsive Portfolio Website, go check out the channel has lots of useful tutorial for web developement


# Get started

You can get started by cloning the project, make a copy of .env.exmaple and rename it to .env and enter your MySQL configurations

After that is done, use **php artisan migrate** to make the migrations, then type the following command to create a user to be able to edit it

```
   php artisan tinker
   $user = new App\User();
   $user->name = '{enter your name here}';
   $user->email = '{enter your email here}';
   $user->password = Hash::make('{enter your password here'});
   $user->save();
```

Now type **php artisan server** head over to localhost:8000 and you will find it running.

To edit the content simply head to localhost:8000/edit/login and enter your email and password and edit every page you want.


Right now the image cannot be modified, will be adding that shortly and will also be implementing option to Edit exisiting Skills and Experience.


Feel free to contribute to the project or use the project for commerical use

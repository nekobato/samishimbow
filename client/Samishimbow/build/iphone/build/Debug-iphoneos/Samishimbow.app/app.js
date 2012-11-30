var my_tags = new Array(3);
my_tags[0] = "カラオケ";
my_tags[1] = "食事";
my_tags[2] = "勉強";

Titanium.UI.setBackgroundColor('#000');

/**************window*************/
var win_login = Titanium.UI.createWindow({  
    title:'Login',
    backgroundImage:'/images/login.png'
});
var win_samisimbow = Titanium.UI.createWindow({
	title:'Samisimbow',
	backgroundColor:'#fff',
});
var win_edit_tag = Titanium.UI.createWindow({  
    title:'EditLabel',
    backgroundColor:'#fff',
    left:-320,
});
var win_search = Titanium.UI.createWindow({
	title:'Search',
	backgroundColor:'#fff',
	left:320,
});
var open_animation = Ti.UI.createAnimation({
	left:0,
	duration:500,
});
var left_animation = Ti.UI.createAnimation({
	left:-320,
	duration:500,
});
var right_animation = Ti.UI.createAnimation({
	left:320,
	duration:500,
});

/***************variable****************/
var tag_labels = new Array(3);
var my_tag_buttons = new Array(3);
var search_button;
var editing_tag;
var title_label;
var name_label;
var user_image;
var edit_field;
var edit_done;
var edit_toolbar;
var search_toolbar;
var search_back_button;
var facebook_login;
var facebook_logout;

/************************facebook**************************/
Ti.Facebook.appid = '115511555274607';
facebook_login = Titanium.UI.createButton({
	bottom:10,
	backgroundImage:'/buttons/fblogin.png',
});
facebook_login.addEventListener('click', function(){
	Ti.Facebook.authorize();
});
facebook_logout = Ti.Facebook.createLoginButton({
	top:10,
	right:10,
});
Ti.Facebook.addEventListener('login', function(e){
	if(e.success){
		Ti.Facebook.requestWithGraphPath('me',{},"GET",setFacebookData);
		win_samisimbow.open(open_animation);
	}
});
Ti.Facebook.addEventListener('logout', function(e){
	win_samisimbow.close();
});

/*********************login***********************/
win_login.add(facebook_login);

/*************************main************************/

for(var i=0;i<3;i++){
	tag_labels[i] = Titanium.UI.createLabel({
		text:"Tag"+(i+1)+":",
		top:200+i*50,
		left:10,
	})
	my_tag_buttons[i] = Titanium.UI.createButton({
		title:my_tags[i],
		top:200+i*50,
		left:100,
		width:100,
		font:{fontFamily:'Osaka'},
	});
	win_samisimbow.add(tag_labels[i]);
	win_samisimbow.add(my_tag_buttons[i]);
}
my_tag_buttons[0].addEventListener('click', function(){
	editing_tag = 0;
	edit_field.value=""+my_tags[editing_tag];
	win_edit_tag.open(open_animation);
});
my_tag_buttons[1].addEventListener('click', function(){
	editing_tag = 1;
	edit_field.value=""+my_tags[editing_tag];
	win_edit_tag.open(open_animation);
});
my_tag_buttons[2].addEventListener('click', function(){
	editing_tag = 2;
	edit_field.value=""+my_tags[editing_tag];
	win_edit_tag.open(open_animation);
});
name_label = Titanium.UI.createLabel({
	left:10,
	top:10,
});
user_image = Titanium.UI.createImageView({
	left:10,
	top:50,
});
search_button = Titanium.UI.createButton({
	title:'Search',
	bottom:10,
	right:10,
});
search_button.addEventListener('click', function(){
	win_search.open(open_animation);
});
win_samisimbow.add(name_label);
win_samisimbow.add(user_image);
win_samisimbow.add(search_button);
win_samisimbow.add(facebook_logout);

/************************edit tag************************/
edit_field = Titanium.UI.createTextField({
	top:100,
	width:100,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
});
edit_done = Ti.UI.createButton({
	systemButton:Ti.UI.iPhone.SystemButton.DONE,
});
edit_toolbar = Ti.UI.createToolbar({
	top:-1,
	items:[edit_done],
});
edit_done.addEventListener('click', function(e){
	my_tags[editing_tag] = edit_field.value;
	my_tag_buttons[editing_tag].title = my_tags[editing_tag];
	win_edit_tag.close();
});
win_edit_tag.add(edit_field);
win_edit_tag.add(edit_toolbar);

/***********************search***********************/
search_back_button = Titanium.UI.createButton({
	style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
	title:'戻る',
});
search_toolbar = Titanium.UI.createToolbar({
	top:-1,
	items:[search_back_button],
});
search_back_button.addEventListener('click', function(){
	win_search.close();
});
win_search.add(search_toolbar);


/************************create start window***********************/
win_login.open();
if(Ti.Facebook.loggedIn){
	Ti.Facebook.requestWithGraphPath('me',{},"GET",setFacebookData);
	win_samisimbow.open();
}

/***********************functions*************************/
function setFacebookData(e){
	if (e.success) {
        var obj = JSON.parse(e.result);
        name_label.text = obj.name;
        user_image.url = "https://graph.facebook.com/"+obj.id+"/picture";
    }
}

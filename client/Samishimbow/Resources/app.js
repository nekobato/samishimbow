var server_name = 'http://ec2-23-20-200-122.compute-1.amazonaws.com/samishimbow/';

var my_tags = new Array(3);
var my_comments = new Array(3);
var my_tag_flags = new Array(3);
my_tag_flags[0] = false;
my_tag_flags[1] = false;
my_tag_flags[2] = false;

Titanium.UI.setBackgroundColor('#000');

/**************window*************/
var win_login = Titanium.UI.createWindow({  
    title:'Login',
    backgroundImage:'/images/login.png'
});
var win_samisimbow = Titanium.UI.createWindow({
	title:'Samisimbow',
	backgroundColor:'#000',
});
var win_edit_tag = Titanium.UI.createWindow({  
    title:'EditLabel',
    backgroundColor:'#000',
});
var win_search = Titanium.UI.createWindow({
	title:'Search',
	backgroundImage:'/images/match.png',
});

/***************variable****************/
var tag_labels = new Array(3);
var comment_labels = new Array(3);
var my_tag_buttons = new Array(3);
var tag_switch = new Array(3);
var search_button;
var editing_tag;
var title_label;
var name_label;
var user_image;
var edit_field;
var edit_comment_field;
var edit_done;
var edit_cancel;
var edit_title;
var edit_tag_label;
var edit_comment_label;
var edit_tag_search;
var search_select_buttons = new Array(3);
var search_select_all;
var search_my_icon;
var search_back_button;
var search_load;
var facebook_login;
var facebook_logout;

/************************facebook**************************/
Ti.Facebook.appid = '115511555274607';
facebook_login = Titanium.UI.createButton({
	bottom:10,
	width:272,
	height:49,
	backgroundImage:'/buttons/fblogin.png',
});
facebook_login.addEventListener('click', function(){
	Ti.Facebook.authorize();
});
facebook_logout = Titanium.UI.createButton({
	top:10,
	right:10,
	width:73,
	height:25,
	backgroundImage:'/buttons/fblogout.png',
});
facebook_logout.addEventListener('click', function(){
	Ti.Facebook.logout();
	win_samisimbow.close();
});
Ti.Facebook.addEventListener('login', function(e){
	if(e.success){
		win_login.remove(facebook_login);
		Ti.Facebook.requestWithGraphPath('me',{},"GET",setFacebookData);
	}else{
		var errorAlert = Titanium.UI.createAlertDialog({
			title: 'エラー',
			message: 'ログインに失敗しました。',
		});
		errorAlert.show();
	}
});
Ti.Facebook.addEventListener('logout', function(e){
	win_samisimbow.close();
});

/*********************login***********************/
if(!Ti.Facebook.loggedIn)	win_login.add(facebook_login);

/*************************main************************/
for(var i=0;i<3;i++){
	tag_labels[i] = Titanium.UI.createLabel({
		top:105+i*100,
		left:5,
		color:'#000',
		font:{fontSize:25,fontFamily:'S2G Uni font'},
	});
	comment_labels[i] = Titanium.UI.createLabel({
		top:135+i*100,
		left:5,
		width:260,
		color:'#000',
		font:{fontSize:20,fontFamily:'S2G Uni font'},
	});
	my_tag_buttons[i] = Titanium.UI.createButton({
		backgroundImage:'/buttons/status'+i+'.png',
		top:100+i*100,
		width:320,
		height:100,
	});
	tag_switch[i] = Titanium.UI.createButton({
		top:134+i*100,
		right:15,
		width:32,
		height:32,
	});
	if(my_tag_flags[i])	tag_switch[i].backgroundImage = '/buttons/on.png';
	else				tag_switch[i].backgroundImage = '/buttons/off.png';
	
	win_samisimbow.add(my_tag_buttons[i]);
	win_samisimbow.add(tag_labels[i]);
	win_samisimbow.add(comment_labels[i]);
	win_samisimbow.add(tag_switch[i]);
}
my_tag_buttons[0].addEventListener('click', function(){
	editing_tag = 0;
	win_edit_tag.open();
});
my_tag_buttons[1].addEventListener('click', function(){
	editing_tag = 1;
	win_edit_tag.open();
});
my_tag_buttons[2].addEventListener('click', function(){
	editing_tag = 2;
	win_edit_tag.open();
});
tag_switch[0].addEventListener('click', function(){
	if(my_tags[0] != "なし"){
		my_tag_flags[0] = !my_tag_flags[0];
		if(my_tag_flags[0]) tag_switch[0].backgroundImage = '/buttons/on.png';
		else				tag_switch[0].backgroundImage = '/buttons/off.png';
		sendTagSwitchs();
	}
});
tag_switch[1].addEventListener('click', function(){
	if(my_tags[1] != "なし"){
		my_tag_flags[1] = !my_tag_flags[1];
		if(my_tag_flags[1]) tag_switch[1].backgroundImage = '/buttons/on.png';
		else				tag_switch[1].backgroundImage = '/buttons/off.png';
		sendTagSwitchs();
	}
});
tag_switch[2].addEventListener('click', function(){
	if(my_tags[2] != "なし"){
		my_tag_flags[2] = !my_tag_flags[2];
		if(my_tag_flags[2]) tag_switch[2].backgroundImage = '/buttons/on.png';
		else				tag_switch[2].backgroundImage = '/buttons/off.png';
		sendTagSwitchs();
	}
});
name_label = Titanium.UI.createLabel({
	font:{fontSize:20, fontFamily:'S2G Uni font'},
	color:'#fff',
	top:40,
});
user_image = Titanium.UI.createImageView({
	left:10,
	top:10,
});
search_button = Titanium.UI.createButton({
	title:'Search',
	backgroundImage:'/buttons/matching.png',
	font:{fontFamily:'S2G Uni font',fontSize:25},
	bottom:0,
	width:320,
	height:60,
});
search_button.addEventListener('click', function(){
	win_search.open();
});
win_samisimbow.add(name_label);
win_samisimbow.add(user_image);
win_samisimbow.add(search_button);
win_samisimbow.add(facebook_logout);

/************************edit tag************************/
win_edit_tag.addEventListener('open', function(){
	if(my_tags[editing_tag] == 'なし'){
		edit_field.value = '';
		edit_comment_field.value = 'ご自由にどうぞ';
		edit_comment_field.color = '#888';
	}else{
		edit_field.value=""+my_tags[editing_tag];
		edit_comment_field.value=""+my_comments[editing_tag];
	}
});
edit_field = Titanium.UI.createTextField({
	top:120,
	width:250,
	hintText:'検索 or 新規作成してください',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	font:{fontSize:15},
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
});
edit_comment_field = Titanium.UI.createTextArea({
	top:250,
	width:250,
	height:190,
	hintText:'ご自由にどうぞ',
	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	font:{fontSize:15},
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_NEVER,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	borderRadius:5,
});
edit_comment_field.addEventListener('focus', function(){
	win_edit_tag.animate({
		top:-210,
		duration:500,
	});
	if(this.value == 'ご自由にどうぞ'){
		this.value = '';
		this.color = '#000';
	}
});
edit_comment_field.addEventListener('blur', function(){
	win_edit_tag.animate({
		top:0,
		duration:500,
	});
	if(this.value == ''){
		this.value = 'ご自由にどうぞ';
		this.color = '#888';
	}
});
edit_done = Ti.UI.createButton({
	backgroundImage:'/buttons/check.png',
	width:26,
	height:26,
	right:15,
	top:30,
});
edit_cancel = Ti.UI.createButton({
	backgroundImage:'/buttons/back.png',
	width:27,
	height:27,
	left:15,
	top:30,
});
edit_tag_label = Titanium.UI.createLabel({
	text:'Tag',
	font:{fontFamily:'S2G Uni font',fontSize:20},
	color:'#fff',
	top:80,
	left:15,
});
edit_comment_label = Titanium.UI.createLabel({
	text:'Comment',
	font:{fontFamily:'S2G Uni font',fontSize:20},
	color:'#fff',
	top:210,
	left:15,
});
edit_tag_search = Titanium.UI.createButton({
	backgroundImage:'/buttons/search.png',
	width:23,
	height:24,
	top:80,
	left:50,
});
edit_done.addEventListener('click', function(e){
	if(edit_field.value != ''){
		my_tags[editing_tag] = edit_field.value;
		tag_labels[editing_tag].text = my_tags[editing_tag];
		my_comments[editing_tag] = edit_comment_field.value;
		comment_labels[editing_tag].text = my_comments[editing_tag];
		my_tag_flags[editing_tag] = true;
		tag_switch[editing_tag].backgroundImage = '/buttons/on.png';
		
		Ti.App.Properties.setString('Tag'+editing_tag, my_tags[editing_tag]);
		Ti.App.Properties.setString('Comment'+editing_tag, my_comments[editing_tag]);
		if(sendMyTags() && sendTagSwitchs())	win_edit_tag.close();
	}else{
		win_edit_tag.close();
	}
});
edit_cancel.addEventListener('click', function(e){
	win_edit_tag.close();
});
edit_title = Ti.UI.createLabel({
	font:{fontSize:20,fontFamily:'S2G Uni font'},
	text:'編集',
	color:'#fff',
	top:30,
})
win_edit_tag.add(edit_field);
win_edit_tag.add(edit_comment_field);
win_edit_tag.add(edit_done);
win_edit_tag.add(edit_tag_label);
win_edit_tag.add(edit_comment_label);
win_edit_tag.add(edit_tag_search);
win_edit_tag.add(edit_cancel);
win_edit_tag.add(edit_title);

/***********************search***********************/
for(var i=0;i<3;i++){
	search_select_buttons[i] = Titanium.UI.createButton({
		backgroundImage:'/buttons/'+i+'.png',
		width:85,
		height:72,
		left:65+85*i,
		bottom:0,
		font:{fontFamily:'S2G Uni font',fontSize:20},
		color:'#000',
	});
	if(i==0)		search_select_buttons[i].title = 'A';
	else if(i==1)	search_select_buttons[i].title = 'B';
	else if(i==2)	search_select_buttons[i].title = 'C';
	win_search.add(search_select_buttons[i]);
}
search_select_all = Titanium.UI.createButton({
	title:'All',
	backgroundImage:'/buttons/all.png',
	width:65,
	height:72,
	left:0,
	bottom:0,
	font:{fontFamily:'S2G Uni font',fontSize:20},
	color:'#000',
});
search_my_icon = Titanium.UI.createImageView({
	top:190,
});
search_load = Titanium.UI.createButton({
	backgroundImage:'/buttons/loading.png',
	width:27,
	height:27,
	right:15,
	top:30,
});
search_back_button = Titanium.UI.createButton({
	backgroundImage:'/buttons/back.png',
	width:27,
	height:27,
	left:15,
	top:30,
});
search_back_button.addEventListener('click', function(){
	win_search.close();
});
win_search.add(search_select_all);
win_search.add(search_my_icon);
win_search.add(search_load);
win_search.add(search_back_button);


/************************create start window***********************/
win_login.open();
if(!Titanium.Network.online){
	var errorAlert = Titanium.UI.createAlertDialog({
		title: 'ネットワークエラー',
		message: 'ネットワークに接続してください。',
	});
	errorAlert.show();
}else if(!Titanium.Geolocation.locationServicesEnabled){
	var errorAlert = Titanium.UI.createAlertDialog({
		title: 'エラー',
		message: 'GPSを有効にしてください。',
	});
	errorAlert.show();
}else if(Ti.Facebook.loggedIn){
	Ti.Facebook.requestWithGraphPath('me',{},"GET",setFacebookData);
}

/***********************functions*************************/
function setFacebookData(e){
	if(e.success) {
        var obj = JSON.parse(e.result);
        name_label.text = obj.first_name+" のステータス";
        user_image.url = "https://graph.facebook.com/"+obj.id+"/picture";
        search_my_icon.url = "https://graph.facebook.com/"+obj.id+"/picture";
        
        if(Ti.App.Properties.getString('FBId') != obj.id){
        	if(!sendMyData(obj))	return;
        	Ti.App.Properties.setString('FBId', obj.id);
        	getTags(false);
        }else{
        	getTags(true);
        }
        
        win_samisimbow.open();
        win_login.add(facebook_login);
    }else{
    	var errorAlert = Titanium.UI.createAlertDialog({
			title: 'エラー',
			message: 'ログインに失敗しました。',
		});
		errorAlert.show();
    }
}

function getTags(isLoad){
	for(var i=0;i<3;i++){
		if(!isLoad){
			Ti.App.Properties.setString('Tag'+i, 'なし');
			Ti.App.Properties.setString('Comment'+i, 'タッチしてください。');
		}
		my_tags[i] = Ti.App.Properties.getString('Tag'+i);
		my_comments[i] = Ti.App.Properties.getString('Comment'+i);
		
		tag_labels[i].text = my_tags[i];
		comment_labels[i].text = my_comments[i];
	}
}

function sendMyData(obj){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', server_name + 'fblogin?fb_id=' + obj.id + '&name=' + obj.first_name);
	xhr.onerror = function(){
		var errorAlert = Titanium.UI.createAlertDialog({
			title: 'エラー',
			message: 'サーバーとの接続に失敗しました。',
		});
		errorAlert.show();
		return false;
	}
	xhr.onload = function(){
		var response = JSON.parse(this.responseText);
		Ti.App.Properties.setString('Id', response.id[0]);
	}
	
	xhr.send();
	return true;
}

function sendMyTags(){
	var xhr = Ti.Network.createHTTPClient();
	var str = server_name + 'updatetag?id=' + Ti.App.Properties.getString('Id') + '&';
	var i;
	for(i=0;i<3;i++) str += 'tag' + (i+1) + '=' + my_tags[i] + '&';
	for(i=0;i<3;i++){
		str += 'tag' + (i+1) + '_detail=' + my_comments[i];
		if(i<2) str += '&';
	}
	xhr.open('GET', str);
	xhr.onerror = function(){
		var errorAlert = Titanium.UI.createAlertDialog({
			title: 'エラー',
			message: 'サーバーとの接続に失敗しました。',
		});
		errorAlert.show();
		return false;
	}
	
	xhr.send();
	return true;
}

function sendTagSwitchs(){
	var xhr = Ti.Network.createHTTPClient();
	var str = server_name + 'switchtag?id=' + Ti.App.Properties.getString('Id') + '&';
	var i;
	for(i=0;i<3;i++){
		var bool;
		if(my_tag_flags[i])	bool = 1;
		else				bool = 0;
		str += 'tag' + (i+1) + '=' + bool;
		if(i<2) str += '&';
	}
	xhr.open('GET', str);
	xhr.onerror = function(){
		var errorAlert = Titanium.UI.createAlertDialog({
			title: 'エラー',
			message: 'サーバーとの接続に失敗しました。',
		});
		errorAlert.show();
		return false;
	}
	
	xhr.send();
	
	sendGPS();
	return true;
}

function sendGPS(){
	Titanium.Geolocation.getCurrentPosition(function(e){
		if (!e.success || e.error){
			var errorAlert = Titanium.UI.createAlertDialog({
				title: 'エラー',
				message: '位置情報が取得できませんでした',
			});
			errorAlert.show();
            return;
        }
        
		var xhr = Ti.Network.createHTTPClient();
		var str = server_name + 'updategeo?id=' + Ti.App.Properties.getString('Id') + '&geox=' + e.coords.latitude + '&geoy=' + e.coords.longitude;
		
		xhr.open('GET', str);
		xhr.onerror = function(){
			var errorAlert = Titanium.UI.createAlertDialog({
				title: 'エラー',
				message: 'サーバーとの接続に失敗しました。',
			});
			errorAlert.show();
		}
		xhr.onload = function(){
			if(this.responseText != 'success'){
				var errorAlert = Titanium.UI.createAlertDialog({
					title: 'エラー',
					message: 'サーバーとの接続に失敗しました。',
				});
				errorAlert.show();
			}
		}
		
		xhr.send();
	});
}

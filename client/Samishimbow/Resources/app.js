// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    window:win1
});

Ti.Facebook.appid = '115511555274607';
var button = Ti.Facebook.createLoginButton(
	{
		left: 5,
		top: 5,
	}
);
win1.add(button);

var getButton = Ti.UI.createButton({
    title: 'get',
    top: 200,
    left: 100,
    height: 50,
    width: 100,
});
getButton.addEventListener('click',function(){
    Ti.Facebook.requestWithGraphPath(
        'me',
        {},
        "GET",
        function(e) {
            if (e.success) {
                var obj = JSON.parse(e.result);
                alert("Success: " + obj.name + "," + obj.id);
            }
        }
    );
})
win1.add(getButton);

win1.hideTabBar();
tabGroup.addTab(tab1);
tabGroup.open();

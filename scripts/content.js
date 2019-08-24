var WINS = [];
var REMAINDER = 0;

function init()
{
	WINS = [];
	REMAINDER = 0;
}
function tryToFinish()
{
	REMAINDER -= 1;
	if ( REMAINDER === 0 )
	{
		reopenTabs();
	}
}
function saveTabs( id )
{
	var urls = [];
	var done = false;
	chrome.tabs.getAllInWindow( id, function( tabs )
	{
		var i = 0;
		while ( i<tabs.length )
		{
			urls.push( tabs[i].url );
			i += 1;
		}
		WINS.push( urls );
	});
}
function closeTabs()
{ 
	chrome.windows.getAll( null, function( wins )
	{
		var id = -1;
		var i = 0;

		while ( i<wins.length )
		{
			id = wins[i].id;
			if ( wins[i].incognito )
			{
				saveTabs( id );
				chrome.windows.remove( id );
				REMAINDER += 1;
			}
			i += 1;
		}
	});
}
function reopenTabs()
{
	var i = 0;
	while ( i<WINS.length )
	{
		var winData =
		{
			url: WINS[i],
			incognito: true
		}
		chrome.windows.create( winData );
		i += 1;
	}
}
chrome.windows.onRemoved.addListener( function( id )
{
	tryToFinish();
});
chrome.browserAction.onClicked.addListener( function()
{
	init();
	closeTabs();
});

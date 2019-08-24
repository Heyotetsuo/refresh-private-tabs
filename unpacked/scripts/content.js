var WINS = [];
var REMAINDER = 0;
var ANCHORID = 999999999;
var WORKING = false;

function init()
{
	WINS = [];
	REMAINDER = 0;
	WORKING = true;
}
function tryToFinish()
{
	if ( !WORKING )
	{
		return false;
	}
	REMAINDER -= 1;
	if ( REMAINDER === 0 )
	{
		reopenTabs();
		cleanup();
	}
}
function cleanup()
{
	chrome.windows.remove( ANCHORID );
	WORKING = false;
}
function anchor()
{
	var winData =
	{
		tabId: ANCHORID,
		state: "minimized"
	}
	chrome.windows.create( winData );
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
	chrome.windows.create
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
	anchor();
	closeTabs();
});

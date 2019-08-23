function closeTabs()
{
	chrome.windows.getAll( null, function(wins)
	{
		var i = 0;
		while ( i<wins.length )
		{
			if ( wins[i].incognito )
			{
				chrome.windows.remove( wins[i].id );
			}
			i += 1;
		}
	});
}
chrome.browserAction.onClicked.addListener( function()
{
	closeTabs();
});

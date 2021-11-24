// -- FUNCTIONS

function GetUrl(
    )
{
    return window.location.href;
}

// ~~

function SetUrl(
    url
    )
{
    window.location.assign( url );
}

// ~~

function ReplaceUrl(
    url
    )
{
    window.location.replace( url );
}

// ~~

function OpenUrl(
    url
    )
{
    window.open( url, '_blank' ).focus();
}

// ~~

function GetServerName(
    )
{
    return window.location.hostname;
}

// ~~

function GetRoute(
    removed_prefix = undefined,
    removed_suffix = undefined
    )
{
    var
        route;

    route = window.location.pathname;

    if ( removed_prefix !== undefined
         && route.startsWith( removed_prefix ) )
    {
        route = route.substring( removed_prefix.length );
    }

    if ( removed_suffix !== undefined
         && route.endsWith( removed_suffix ) )
    {
        route = route.substring( 0, route.length - removed_suffix.length );
    }

    return route;
}

// ~~

function SetRoute(
    route
    )
{
    if ( window.location.pathname !== route )
    {
        window.history.pushState( "", "", route );
    }
}

// ~~

function GetHash(
    )
{
    return window.location.hash;
}

// ~~

function HandleRouteEvent(
    called_function
    )
{
    window.onpopstate = function(
        event
        )
    {
        called_function();
    }
}

// ~~

function HandleResizeEvent(
    called_function
    )
{
    window.onresize = function(
        event
        )
    {
        called_function();
    }
}

// ~~

function GetQuery(
    )
{
    return window.location.search;
}

// ~~

function IsMobileBrowser(
    )
{
    var
        user_agent;

    user_agent = navigator.userAgent.GetLowerCaseText();

    return (
        user_agent.indexOf( "android" ) >= 0
        || user_agent.indexOf( "iphone" ) >= 0
        || user_agent.indexOf( "ipad" ) >= 0
        || user_agent.indexOf( "ipod" ) >= 0
        || user_agent.indexOf( "blackberry" ) >= 0
        || user_agent.indexOf( "phone" ) >= 0
        );
}

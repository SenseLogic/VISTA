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

function GetRoute(
    )
{
    return window.location.pathname;
}

// ~~

function SetRoute(
    route
    )
{
    window.history.pushState( "", "", route );
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

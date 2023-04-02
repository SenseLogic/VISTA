// -- VARIABLES

var
    GoogleAnalyticsTrackingId = "",
    GoogleAnalyticsTrackingIsEnabled = false,
    GoogleAnalyticsTrackingScript = null;

// -- FUNCTIONS

function TrackRoute(
    )
{
    if ( GoogleAnalyticsTrackingIsEnabled )
    {
        gtag(
            "config",
            GoogleAnalyticsTrackingId,
            {
                "page_title" : window.location.pathname,
                "page_path" : window.location.pathname
            }
            );
    }
}

// ~~

function gtag(
    )
{
    window.dataLayer.push( arguments );
}

// ~~

function EnableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script;

    if ( !GoogleAnalyticsTrackingIsEnabled )
    {
        GoogleAnalyticsTrackingIsEnabled = true;
        GoogleAnalyticsTrackingId = tracking_id;
        GoogleAnalyticsTrackingScript = document.createElement( "script" );
        GoogleAnalyticsTrackingScript.async = true;
        GoogleAnalyticsTrackingScript.src = "https://www.googletagmanager.com/gtag/js?id=" + tracking_id;

        document.head.appendChild( GoogleAnalyticsTrackingScript );

        window.dataLayer = window.dataLayer || [];

        gtag( "js", new Date() );
        gtag( "config", tracking_id );

        TrackRoute();
    }
}

// ~~

function DisableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script;

    if ( GoogleAnalyticsTrackingIsEnabled
         && GoogleAnalyticsTrackingId === tracking_id )
    {
        document.head.removeChild( GoogleAnalyticsTrackingScript );

        window.dataLayer = [];

        GoogleAnalyticsTrackingIsEnabled = false;
        GoogleAnalyticsTrackingId = "";
        GoogleAnalyticsTrackingScript = null;
    }
}

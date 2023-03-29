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

function EnableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script;

    if ( !GoogleAnalyticsTrackingIsEnabled )
    {
        GoogleAnalyticsTrackingScript = document.createElement( "script" );
        GoogleAnalyticsTrackingScript.async = true;
        GoogleAnalyticsTrackingScript.src = "https://www.googletagmanager.com/gtag/js?id=" + tracking_id;

        document.head.appendChild( GoogleAnalyticsTrackingScript );

        window.dataLayer = window.dataLayer || [];
        window.gtag = () => window.dataLayer.push( arguments );

        gtag( "js", new Date() );
        gtag( "config", tracking_id );

        GoogleAnalyticsTrackingIsEnabled = true;
        GoogleAnalyticsTrackingId = tracking_id;

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
        GoogleAnalyticsTrackingIsEnabled = false;
        GoogleAnalyticsTrackingId = "";

        document.head.removeChild( GoogleAnalyticsTrackingScript );

        window.dataLayer = [];
        window.gtag = undefined;

        GoogleAnalyticsTrackingScript = null;
    }
}

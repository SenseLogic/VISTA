// -- VARIABLES

var
    GoogleAnalyticsTrackingId = "",
    GoogleAnalyticsTrackingIsEnabled = false,
    GoogleAnalyticsTrackingScript = null,
    GoogleTagManagerTrackingId = "",
    GoogleTagManagerTrackingIsEnabled = false,
    GoogleTagManagerTrackingScript = null;

// -- FUNCTIONS

function gtag(
    )
{
    window.dataLayer.push( arguments );
}

// ~~

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
                "page_path" : window.location.pathname,
                "page_location" : window.location.href
            }
            );
    }

    if ( GoogleTagManagerTrackingIsEnabled )
    {
        window.dataLayer.push(
            {
                "event" : "page_view",
                "page_title" : document.title,
                "page_path" : window.location.pathname,
                "page_location" : window.location.href
            }
            );
    }
}

// ~~

function EnableGoogleAnalyticsTracking(
    tracking_id
    )
{
    if ( !GoogleAnalyticsTrackingIsEnabled )
    {
        GoogleAnalyticsTrackingIsEnabled = true;
        GoogleAnalyticsTrackingId = tracking_id;

        window.dataLayer = window.dataLayer || [];

        GoogleAnalyticsTrackingScript = document.createElement( "script" );
        GoogleAnalyticsTrackingScript.async = true;
        GoogleAnalyticsTrackingScript.src = "https://www.googletagmanager.com/gtag/js?id=" + tracking_id;

        document.head.insertBefore( GoogleAnalyticsTrackingScript, document.head.firstChild );

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

// ~~

function EnableGoogleTagManagerTracking(
    tracking_id
    )
{
    if ( !GoogleTagManagerTrackingIsEnabled )
    {
        GoogleTagManagerTrackingIsEnabled = true;
        GoogleTagManagerTrackingId = tracking_id;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(
            {
                "gtm.start" : new Date().getTime(),
                event: "gtm.js"
            }
            );

        GoogleTagManagerTrackingScript = document.createElement( "script" );
        GoogleTagManagerTrackingScript.async = true;
        GoogleTagManagerTrackingScript.src = "https://www.googletagmanager.com/gtm.js?id=" + tracking_id;

        document.head.insertBefore( GoogleTagManagerTrackingScript, document.head.firstChild );

        TrackRoute();
    }
}

// ~~

function DisableGoogleTagManagerTracking(
    tracking_id
    )
{
    if ( GoogleTagManagerTrackingIsEnabled
         && GoogleTagManagerTrackingId === tracking_id )
    {
        document.head.removeChild( GoogleTagManagerTrackingScript );

        window.dataLayer = [];

        GoogleTagManagerTrackingIsEnabled = false;
        GoogleTagManagerTrackingId = "";
        GoogleTagManagerTrackingScript = null;
    }
}

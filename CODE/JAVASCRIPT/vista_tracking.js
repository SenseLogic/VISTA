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
                "page_path" : window.location.pathname
            }
            );
    }

    if ( GoogleTagManagerTrackingIsEnabled )
    {
        gtag(
            {
                'event': 'pageView',
                'pagePath': window.location.pathname,
                'pageTitle': document.title
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
        GoogleAnalyticsTrackingScript = document.createElement( "script" );
        GoogleAnalyticsTrackingScript.async = true;
        GoogleAnalyticsTrackingScript.src = "https://www.googletagmanager.com/gtag/js?id=" + tracking_id;

        document.head.insertBefore( GoogleAnalyticsTrackingScript, document.head.firstChild );

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
        GoogleTagManagerTrackingScript = document.createElement( "script" );
        GoogleTagManagerTrackingScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tracking_id}');`;

        document.head.insertBefore( GoogleTagManagerTrackingScript, document.head.firstChild );

        window.dataLayer = window.dataLayer || [];

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

        GoogleTagManagerTrackingIsEnabled = false;
        GoogleTagManagerTrackingId = "";
        GoogleTagManagerTrackingScript = null;
    }
}

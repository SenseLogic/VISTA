// -- VARIABLES

var
    GoogleAnalyticsTrackingId = "",
    GoogleAnalyticsTrackingIsEnabled = false;

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

    script = document.createElement( "script" );
    script.setAttribute( "src", "https://www.googletagmanager.com/gtag/js?id=" + tracking_id );
    document.head.appendChild( script );

    script = document.createElement( "script" );
    script.text
        = `window.dataLayer = window.dataLayer || [];
           function gtag() { dataLayer.push( arguments ); }
           gtag( "js", new Date() );
           gtag( "config", "${tracking_id}" );`;
    document.head.appendChild( script );

    GoogleAnalyticsTrackingId = tracking_id;
    GoogleAnalyticsTrackingIsEnabled = true;

    TrackRoute();
}

// ~~

function DisableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script;

    script = document.createElement( "script" );
    script.setAttribute( "src", "https://www.googletagmanager.com/gtag/js?id=" + tracking_id  );
    document.head.appendChild( script );

    script = document.createElement( "script" );
    script.text
        = `window.dataLayer = window.dataLayer || [];
           function gtag() { dataLayer.push( arguments ); }
           gtag( "js", new Date() );
           gtag( "config", "${tracking_id}", { "client_storage": "none", "anonymize_ip": true } );`;
    document.head.appendChild( script );

    GoogleAnalyticsTrackingId = tracking_id;
    GoogleAnalyticsTrackingIsEnabled = false;
}

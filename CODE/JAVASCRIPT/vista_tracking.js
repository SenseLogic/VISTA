// -- VARIABLES

var
    GoogleAnalyticsTrackingScriptElement = null,
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

function ImportGoogleAnalyticsScript(
    tracking_id
    )
{
    if ( GoogleAnalyticsTrackingScriptElement === null )
    {
        GoogleAnalyticsTrackingScriptElement = document.createElement( "script" );
        GoogleAnalyticsTrackingScriptElement.setAttribute( "src", "https://www.googletagmanager.com/gtag/js?id=" + tracking_id );
        GoogleAnalyticsTrackingScriptElement.setAttribute( "data-gtag-js", "" );
        document.head.appendChild( GoogleAnalyticsTrackingScriptElement );
    }
}

// ~~

function EnableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script_element;

    if ( !GoogleAnalyticsTrackingIsEnabled )
    {
        ImportGoogleAnalyticsScript();

        script_element = document.createElement( "script" );
        script_element.text
            = `window.dataLayer = window.dataLayer || [];
               function gtag() { dataLayer.push( arguments ); }
               gtag( "js", new Date() );
               gtag( "config", "${tracking_id}" );`;

        document.head.appendChild( script_element );

        GoogleAnalyticsTrackingId = tracking_id;
        GoogleAnalyticsTrackingIsEnabled = true;
    }

    TrackRoute();
}

// ~~

function DisableGoogleAnalyticsTracking(
    tracking_id
    )
{
    var
        script_element;

    if ( GoogleAnalyticsTrackingIsEnabled )
    {
        script_element = document.createElement( "script" );
        script_element.text
            = `window.dataLayer = window.dataLayer || [];
               function gtag() { dataLayer.push( arguments ); }
               gtag( "js", new Date() );
               gtag( "config", "${tracking_id}", { "client_storage" : "none", "anonymize_ip" : true, "send_to" : null } );`;

        document.head.appendChild( script_element );

        GoogleAnalyticsTrackingId = tracking_id;
        GoogleAnalyticsTrackingIsEnabled = false;
    }
}

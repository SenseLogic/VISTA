// -- VARIABLES

var
    MinimumViewportAspectRatio = 0,
    MaximumViewportAspectRatio = 1E9,
    ViewportHeight = 1,
    ViewportWidth = 1,
    ViewportHeightPercent = 1,
    ViewportWidthPercent = 1,
    ViewportHeightAspectRatio = 1,
    ViewportWidthAspectRatio = 1;

// -- FUNCTIONS

function UpdateViewportProperties(
    )
{
    ViewportHeight = window.innerHeight;
    ViewportWidth = window.innerWidth;

    if ( ViewportWidth > 0 )
    {
        ViewportHeightAspectRatio = Math.min( Math.max( ViewportHeight / ViewportWidth, MinimumViewportAspectRatio ), MaximumViewportAspectRatio );
    }
    else
    {
        ViewportHeightAspectRatio = MaximumViewportAspectRatio;
    }

    if ( ViewportHeight > 0 )
    {
        ViewportWidthAspectRatio = Math.min( Math.max( ViewportWidth / ViewportHeight, MinimumViewportAspectRatio ), MaximumViewportAspectRatio );
    }
    else
    {
        ViewportWidthAspectRatio = MaximumViewportAspectRatio;
    }

    document.documentElement.style.setProperty( "--viewport-height", ViewportHeight + "px" );
    document.documentElement.style.setProperty( "--viewport-width", ViewportWidth + "px" );
    document.documentElement.style.setProperty( "--viewport-height-percent", ViewportHeight * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-width-percent", ViewportWidth * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-height-aspect-ratio", ViewportHeightAspectRatio );
    document.documentElement.style.setProperty( "--viewport-width-aspect-ratio", ViewportWidthAspectRatio );
}

// -- STATEMENTS

UpdateViewportProperties();

window.addEventListener( "resize", UpdateViewportProperties );

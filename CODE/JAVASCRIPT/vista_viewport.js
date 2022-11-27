// -- VARIABLES

var
    MinimumViewportAspectRatio = 0,
    MaximumViewportAspectRatio = 1E9;

// -- FUNCTIONS

function UpdateViewportProperties(
    )
{
    var
        viewport_height,
        viewport_height_aspect_ratio,
        viewport_width,
        viewport_width_aspect_ratio;

    viewport_height = window.innerHeight;
    viewport_width = window.innerWidth;

    if ( viewport_width > 0 )
    {
        viewport_height_aspect_ratio = Math.min( Math.max( viewport_height / viewport_width, MinimumViewportAspectRatio ), MaximumViewportAspectRatio );
    }
    else
    {
        viewport_height_aspect_ratio = MaximumViewportAspectRatio;
    }

    if ( viewport_height > 0 )
    {
        viewport_width_aspect_ratio = Math.min( Math.max( viewport_width / viewport_height, MinimumViewportAspectRatio ), MaximumViewportAspectRatio );
    }
    else
    {
        viewport_width_aspect_ratio = MaximumViewportAspectRatio;
    }

    document.documentElement.style.setProperty( "--viewport-height", viewport_height + "px" );
    document.documentElement.style.setProperty( "--viewport-width", viewport_width + "px" );
    document.documentElement.style.setProperty( "--viewport-height-percent", viewport_height * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-width-percent", viewport_width * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-height-aspect-ratio", viewport_height_aspect_ratio );
    document.documentElement.style.setProperty( "--viewport-width-aspect-ratio", viewport_width_aspect_ratio );
}

// -- STATEMENTS

UpdateViewportProperties();

window.addEventListener( "resize", UpdateViewportProperties );

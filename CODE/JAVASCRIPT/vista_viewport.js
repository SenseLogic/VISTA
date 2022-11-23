// -- FUNCTIONS

function UpdateViewportProperties(
    )
{
    document.documentElement.style.setProperty( "--viewport-height", window.innerHeight + "px" );
    document.documentElement.style.setProperty( "--viewport-width", window.innerWidth + "px" );
}

// -- STATEMENTS

UpdateViewportProperties();

window.addEventListener( "resize", UpdateViewportProperties );

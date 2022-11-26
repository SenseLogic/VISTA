// -- FUNCTIONS

function UpdateViewportProperties(
    )
{
    document.documentElement.style.setProperty( "--viewport-height", window.innerHeight + "px" );
    document.documentElement.style.setProperty( "--viewport-width", window.innerWidth + "px" );
    document.documentElement.style.setProperty( "--viewport-height-percent", window.innerHeight * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-width-percent", window.innerWidth * 0.01 + "px" );
    document.documentElement.style.setProperty( "--viewport-height-aspect-ratio", window.innerHeight / window.innerWidth );
    document.documentElement.style.setProperty( "--viewport-width-aspect-ratio", window.innerWidth / window.innerHeight );
}

// -- STATEMENTS

UpdateViewportProperties();

window.addEventListener( "resize", UpdateViewportProperties );

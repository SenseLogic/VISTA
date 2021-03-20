// -- FUNCTIONS

function GetRouteViewName(
    route
    )
{
    var
        separator_character_index;

    separator_character_index = route.lastIndexOf( "/#" );

    if ( separator_character_index < 0 )
    {
        return route;
    }
    else
    {
        return route.substring( 0, separator_character_index );
    }
}

// ~~

function GetRouteSectionName(
    route
    )
{
    var
        separator_character_index;

    separator_character_index = route.lastIndexOf( "/#" );

    if ( separator_character_index < 0 )
    {
        return "";
    }
    else
    {
        return route.substring( separator_character_index + 1 );
    }
}

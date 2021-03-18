// -- FUNCTIONS

function GetViewName(
    route
    )
{
    var
        separator_character_index;

    separator_character_index = route.indexOf( "#" );

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

function GetSectionName(
    route
    )
{
    var
        separator_character_index;

    separator_character_index = route.indexOf( "#" );

    if ( separator_character_index < 0 )
    {
        return "";
    }
    else
    {
        return route.substring( separator_character_index + 1 );
    }
}

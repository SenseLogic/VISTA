// -- TYPES

class VISTA_ROUTER_COMPONENT extends VISTA_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        template_text
        )
    {
        super( template_text );

        this.Route = "";
    }

    // -- OPERATIONS

    SetRoute(
        route
        )
    {
        this.Route = route;
        this.SetChanged();
    }

    // ~~

    HasRoute(
        filter
        )
    {
        var
            filter_part,
            filter_part_array,
            filter_part_index,
            route_part,
            route_part_array;

        if ( filter.indexOf( "{" ) >= 0 )
        {
            route_part_array = this.Route.split( "/" );
            filter_part_array = filter.split( "/" );

            if ( route_part_array.length === filter_part_array.length )
            {
                for ( filter_part_index = 0;
                      filter_part_index < route_part_array.length;
                      ++filter_part_index )
                {
                    filter_part = filter_part_array[ filter_part_index ];
                    route_part = route_part_array[ filter_part_index ];

                    if ( filter_part.startsWith( "{" )
                         && filter_part.endsWith( "}" ) )
                    {
                        this[ filter_part.slice( 1, -1 ) ] = route_part;
                    }
                    else if ( route_part !== filter_part )
                    {
                        return false;
                    }
                }

                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return this.Route === filter;
        }
    }
}


// -- TYPES

class VISTA_ROUTER_ELEMENT extends VISTA_ELEMENT
{
    // -- CONSTRUCTORS

    constructor(
        template_text
        )
    {
        super( template_text );

        this.Data.Route = "";
    }

    // -- OPERATIONS

    SetRoute(
        route
        )
    {
        this.Data.Route = route;
        this.Data.SetChanged();
    }

    // ~~

    HasRoute(
        filter
        )
    {
        var
            argument_name,
            argument_value,
            filter_character,
            filter_character_index,
            route,
            route_character,
            route_character_index;

        this.Data.SetChanged();

        route = this.Data.Route;
        route_character_index = 0;
        filter_character_index = 0;

        while ( route_character_index < route.length
                && filter_character_index < filter.length )
        {
            route_character = route[ route_character_index ];
            filter_character = filter[ filter_character_index ];

            if ( filter_character === '{' )
            {
                ++filter_character_index;

                argument_name = "";
                argument_value = "";

                while ( filter_character_index < filter.length )
                {
                    filter_character = filter[ filter_character_index ];

                    if ( filter_character === '}' )
                    {
                        ++filter_character_index;

                        break;
                    }
                    else
                    {
                        argument_name += filter_character;
                        ++filter_character_index;
                    }
                }

                while ( route_character_index < route.length )
                {
                    route_character = route[ route_character_index ];

                    if ( route_character === '/' )
                    {
                        break;
                    }
                    else
                    {
                        argument_value += route_character;
                        ++route_character_index;
                    }
                }

                this.Data[ argument_name ] = argument_value;
            }
            else if ( filter_character === route_character )
            {
                ++filter_character_index;
                ++route_character_index;
            }
            else
            {
                return false;
            }
        }

        return (
            route_character_index === route.length
            && filter_character_index === filter.length
            );
    }
}

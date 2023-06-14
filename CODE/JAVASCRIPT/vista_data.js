// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.WatcherArray = [];
        this.HasChanged = false;
        this.IsChangingWatchers = false;
    }

    // -- INQUIRIES

    GetWatcherIndex(
        watcher
        )
    {
        return this.WatcherArray.indexOf( watcher );
    }

    // -- OPERATIONS

    AddWatcher(
        watcher
        )
    {
        if ( this.GetWatcherIndex( watcher ) < 0 )
        {
            this.WatcherArray.AddLastValue( watcher );
        }
    }

    // ~~

    RemoveWatcher(
        watcher
        )
    {
        var
            watcher_index;

        watcher_index = this.GetWatcherIndex( watcher );

        if ( watcher_index >= 0 )
        {
            this.WatcherArray.Splice( watcher_index, 1 );
        }
    }

    // ~~

    WatchData(
        data
        )
    {
        data.AddWatcher( this );
    }

    // ~~

    UnwatchData(
        data
        )
    {
        data.RemoveWatcher( this );
    }

    // ~~

    ChangeWatchers(
        )
    {
        var
            watcher;

        if ( !this.IsChangingWatchers )
        {
            this.IsChangingWatchers = true;

            for ( watcher of this.WatcherArray )
            {
                watcher.SetChanged();
            }

            this.IsChangingWatchers = false;
        }
    }

    // ~~

    SetChanged(
        )
    {
        this.HasChanged = true;
        this.ChangeWatchers();
    }

    // ~~

    SetUpdated(
        )
    {
        this.HasChanged = false;
        this.IsChangingWatchers = false;
    }

    // ~~

    GetTemplateFunction(
        template_text
        )
    {
        var
            section_array,
            section_code,
            section_index,
            section_part_array,
            section_text,
            function_code;

        section_array = template_text.split( "<:" );
        function_code = "() => {\nvar result = " + GetJsonText( section_array[ 0 ] ) + ";\n";

        for ( section_index = 1;
              section_index < section_array.length;
              ++section_index )
        {
            section_part_array = section_array[ section_index ].split( ":>" );

            if ( section_part_array.length >= 2 )
            {
                section_code = section_part_array.RemoveFirstValue();
                section_text = section_part_array.join( ":>" );

                if ( section_code.HasPrefix( "#" ) )
                {
                    function_code += "result += " + section_code.substring( 1 ).Trim() + ";\n";
                }
                else if ( section_code.HasPrefix( "%" ) )
                {
                    function_code += "result += GetEscapedHtml( " +  section_code.substring( 1 ).Trim() + " );\n";
                }
                else
                {
                    function_code += section_code;
                }

                if ( section_text.length > 0 )
                {
                    function_code += "result += " + GetJsonText( section_text ) + ";\n";
                }
            }
            else
            {
                PrintError( "Invalid template expression:" , "<:" + section_array[ section_index ] );

                break;
            }
        }

        function_code += "return result;\n}";

        function_code
            = function_code
                  .replaceAll( "<\\:", "<:" )
                  .replaceAll( ":\\>", ":>" )
                  .replaceAll( "<\\\\:", "<:" )
                  .replaceAll( ":\\\\>", ":>" );

        try
        {
            return eval( function_code );
        }
        catch ( error )
        {
            PrintError( error, function_code );

            return null;
        }
    }
}

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

    FindWatcherIndex(
        watcher
        )
    {
        var
            watcher_index;

        for ( watcher_index = 0;
              watcher_index < this.WatcherArray.length;
              ++watcher_index )
        {
            if ( this.WatcherArray[ watcher_index ] === watcher )
            {
                return watcher_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddWatcher(
        watcher
        )
    {
        if ( this.FindWatcherIndex( watcher ) < 0 )
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

        watcher_index = this.FindWatcherIndex( watcher );

        if ( watcher_index >= 0 )
        {
            this.WatcherArray.splice( watcher_index, 1 );
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

    ProcessTemplate(
        template_text
        )
    {
        return template_text.ReplaceText( "\r", "" );
    }

    // ~~

    SetTemplate(
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

        if ( template_text instanceof HTMLElement )
        {
            template_text = GetDecodedHtml( template_text.innerHTML );
        }

        template_text = this.ProcessTemplate( template_text );
        section_array = template_text.Split( "<:" );
        function_code = "() => {\nvar result = " + GetJsonText( section_array[ 0 ] ) + ";\n";

        for ( section_index = 1;
              section_index < section_array.length;
              ++section_index )
        {
            section_part_array = section_array[ section_index ].Split( ":>" );

            if ( section_part_array.length >= 2 )
            {
                section_code = section_part_array.RemoveFirstValue();
                section_text = section_part_array.Join( ":>" );

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
                  .ReplaceText( "<\\:", "<:" )
                  .ReplaceText( ":\\>", ":>" )
                  .ReplaceText( "<\\\\:", "<:" )
                  .ReplaceText( ":\\\\>", ":>" );

        try
        {
            this.TemplateFunction = eval( function_code );
        }
        catch ( error )
        {
            PrintError( error, function_code );
        }
    }
}

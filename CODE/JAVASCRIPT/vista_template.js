// -- FUNCTIONS

function GetTemplateFunction(
    template_text,
    parameter_list
    )
{
    var
        code,
        part_array,
        section_array,
        section_count,
        template_text,
        text;

    if ( template_text instanceof HTMLElement )
    {
        template_text = GetDecodedHtml( template_text.innerHTML );
    }

    section_array = template_text.split( "\r" ).join( "" ).split( "<:" );
    section_count = section_array.length;

    template_function_code = "(";

    if ( parameter_list !== undefined )
    {
        template_function_code += parameter_list;
    }

    template_function_code += ") => {\nvar result = " + JSON.stringify( section_array[ 0 ] ) + ";\n";

    for ( section_index = 1;
          section_index < section_count;
          ++section_index )
    {
        section_part_array = section_array[ section_index ].split( ":>" );
        section_code = section_part_array.shift();
        section_text = section_part_array.join( ":>" );

        if ( section_code.startsWith( "#" ) )
        {
            template_function_code += "result += " + section_code.substring( 1 ).trim() + ";\n";
        }
        else if ( section_code.startsWith( "%" ) )
        {
            template_function_code += "result += GetEncodedHtml( " +  section_code.substring( 1 ).trim() + " );\n";
        }
        else
        {
            template_function_code += section_code;
        }

        if ( section_text.length > 0 )
        {
            template_function_code += "result += " + JSON.stringify( section_text ) + ";\n";
        }
    }

    template_function_code += "return result;\n}";

    return eval(
        template_function_code
              .split( "<\\:" ).join( "<:" )
              .split( ":\\>" ).join( ":>" )
              .split( "<\\\\:" ).join( "<:" )
              .split( ":\\\\>" ).join( ":>" )
        );
}

// -- FUNCTIONS

function GetUuid(
    )
{
    var
        hexadecimal_text;

    hexadecimal_text
        = ( GetNaturalHexadecimalText( GetMillisecondTimestamp() )
            + GetByteArrayHexadecimalText( GetRandomByteArray( 16 ) ) ).slice( 0, 32 );

    return (
        hexadecimal_text.substring( 8, 16 )
        + "-"
        + hexadecimal_text.substring( 4, 8 )
        + "-"
        + hexadecimal_text.substring( 0, 4 )
        + "-"
        + hexadecimal_text.substring( 16, 20 )
        + "-"
        + hexadecimal_text.substring( 20, 32 )
        );
}

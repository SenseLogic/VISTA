// -- FUNCTIONS

function GetTimeUuid(
    )
{
    var
        hexadecimal_text;

    hexadecimal_text
        = GetNaturalHexadecimalText( ( GetMillisecondTimestamp() + 12219292800000 ) * 10000 )
          + GetByteArrayHexadecimalText( GetRandomByteArray( 16 ) );

    return (
        hexadecimal_text.substring( 7, 15 )
        + "-"
        + hexadecimal_text.substring( 3, 7 )
        + "-1"
        + hexadecimal_text.substring( 0, 3 )
        + "-"
        + hexadecimal_text.substring( 15, 19 )
        + "-"
        + hexadecimal_text.substring( 19, 31 )
        );
}

// ~~

function GetRandomUuid(
    )
{
    var
        hexadecimal_text;

    hexadecimal_text = GetByteArrayHexadecimalText( GetRandomByteArray( 16 ), 32 );

    return (
        hexadecimal_text.substring( 0, 8 )
        + "-"
        + hexadecimal_text.substring( 8, 12 )
        + "-4"
        + hexadecimal_text.substring( 12, 15 )
        + "-"
        + hexadecimal_text.substring( 15, 19 )
        + "-"
        + hexadecimal_text.substring( 19, 31 )
        );
}

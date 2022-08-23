// -- CONSTANTS

const NullTuid = "AAAAAAAAAAAAAAAAAAAAAA";
const NullUuid = "00000000-0000-0000-0000-000000000000";

// -- FUNCTIONS

function GetBase64FromHexadecimal(
    hexadecimal_buffer
    )
{
    let buffer = "";

    for ( let byte_index = 0;
          byte_index < hexadecimal_buffer.length;
          byte_index += 2 )
    {
        buffer += String.fromCharCode( parseInt( hexadecimal_buffer.slice( byte_index, byte_index + 2 ), 16 ) );
    }

    return btoa( buffer );
}

// ~~

function GetHexadecimalFromBase64(
    base_64_buffer
    )
{
    let buffer = atob( base_64_buffer );
    let hexadecimal_buffer = "";

    for ( let character_index = 0;
          character_index < buffer.length;
          ++character_index )
    {
        hexadecimal_buffer += ( "000" + this.charCodeAt( character_index ).toString( 16 ) ).slice( -4 );
    }

    return hexadecimal_buffer;
}

// ~~

function GetTuid(
    uuid
    )
{
    if ( uuid === undefined )
    {
        uuid = crypto.randomUUID();
    }

    return GetBase64FromHexadecimal( uuid.replaceAll( "-", "" ) ).replaceAll( "=", "" );
}

// ~~

function GetUuid(
    )
{
    return crypto.randomUUID();
}

// ~~

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

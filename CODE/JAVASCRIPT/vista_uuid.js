// -- CONSTANTS

const NullTuid = "AAAAAAAAAAAAAAAAAAAAAA";
const NullUuid = "00000000-0000-0000-0000-000000000000";

// -- FUNCTIONS

function GetBase64TextFromHexadecimalText(
    hexadecimal_text
    )
{
    var
        byte_index,
        text;

    text = "";

    for ( byte_index = 0;
          byte_index < hexadecimal_text.length;
          byte_index += 2 )
    {
        text += String.fromCharCode( parseInt( hexadecimal_text.slice( byte_index, byte_index + 2 ), 16 ) );
    }

    return btoa( text );
}

// ~~

function GetTuidFromHexadecimalText(
    hexadecimal_text
    )
{
    return GetBase64TextFromHexadecimalText( hexadecimal_text ).replaceAll( "+", "-" ).replaceAll( "/", "_" ).replaceAll( "=", "" );
}

// ~~

function GetHexadecimalTextFromBase64Text(
    base_64_text
    )
{
    var
        character_index,
        hexadecimal_text,
        text;

    text = atob( base_64_text );
    hexadecimal_text = "";

    for ( character_index = 0;
          character_index < text.length;
          ++character_index )
    {
        hexadecimal_text += ( "0" + text.charCodeAt( character_index ).toString( 16 ) ).slice( -2 );
    }

    return hexadecimal_text;
}

// ~~

function GetHexadecimalTextFromTuid(
    tuid
    )
{
    return GetHexadecimalTextFromBase64Text( tuid.replaceAll( "-", "+" ).replaceAll( "_", "/" ) + "==" );
}

// ~~

function GetUuidFromHexadecimalText(
    hexadecimal_text
    )
{
    return (
        hexadecimal_text.slice( 0, 8 )
        + "-"
        + hexadecimal_text.slice( 8, 12 )
        + "-"
        + hexadecimal_text.slice( 12, 16 )
        + "-"
        + hexadecimal_text.slice( 16, 20 )
        + "-"
        + hexadecimal_text.slice( 20, 32 )
        );
}

// ~~

function GetRandomHexadecimalText(
    byte_count
    )
{
    return GetByteArrayHexadecimalText( GetRandomByteArray( 16 ), 32 );
}

// ~~

function GetTimeUuid(
    )
{
    return GetUuidFromHexadecimalText(
        GetNaturalHexadecimalText( ( GetMillisecondTimestamp() + 12219292800000 ) * 10000 )
        + GetRandomHexadecimalText( 16 )
        );
}

// ~~

function GetRandomUuid(
    )
{
    return crypto.randomUUID();
}

// ~~

function GetUuidFromTuid(
    tuid
    )
{
    return GetUuidFromHexadecimalText( GetHexadecimalTextFromTuid( tuid ) );
}

// ~~

function GetRandomTuid(
    )
{
    return GetTuidFromUuid( GetRandomUuid() );
}

// ~~

function GetTuidFromUuid(
    uuid
    )
{
    return GetTuidFromHexadecimalText( uuid.replaceAll( '-', '' ) );
}

// ~~

function GetTuid(
    uuid
    )
{
    if ( uuid === undefined )
    {
        return GetRandomTuid();
    }
    else
    {
        return GetTuidFromUuid( uuid );
    }
}

// ~~

function GetUuid(
    tuid
    )
{
    if ( tuid === undefined )
    {
        return GetRandomUuid();
    }
    else
    {
        return GetUuidFromTuid( tuid );
    }
}

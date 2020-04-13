// -- FUNCTIONS

function IsPowerOfTwo(
    integer
    )
{
    return ( integer & ( integer - 1 ) ) == 0;
}

// ~~

function GetPaddedNaturalText(
    natural_text,
    minimum_digit_count = 0
    )
{
    var
        digit_count;

    digit_count = natural_text.length;

    if ( digit_count < minimum_digit_count )
    {
        console.log( natural_text, digit_count, minimum_digit_count );
        return (
            "00000000000000000000000000000000".slice( 0, minimum_digit_count - digit_count )
            + natural_text
            );
    }
    else
    {
        return natural_text;
    }
}

// ~~

function GetNaturalHexadecimalText(
    natural,
    minimum_digit_count = 0
    )
{
    return GetPaddedNaturalText( natural.toString( 16 ), minimum_digit_count );
}

// ~~

function GetByteArrayHexadecimalText(
    byte_array
    )
{
    var
        byte_index,
        hexadecimal_text;

    hexadecimal_text = "";

    for ( byte_index = 0;
          byte_index < byte_array.length;
          ++byte_index )
    {
        hexadecimal_text += GetNaturalHexadecimalText( byte_array[ byte_index ], 2 );
    }

    return hexadecimal_text;
}

// ~~

function GetRandomByteArray(
    byte_count
    )
{
    var
        byte_array;

    byte_array = new Uint8Array( byte_count );
    window.crypto.getRandomValues( byte_array );

    return byte_array;
}

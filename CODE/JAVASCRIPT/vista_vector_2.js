// -- FUNCTIONS

function GetVector2(
    x = 0.0,
    y = 0.0
    )
{
    return Float32Array.of(
        x,
        y
        );
}


// ~~

function IsNullVector2(
    vector
    )
{
    return (
        vector[ 0 ] === 0.0
        && vector[ 1 ] === 0.0
        );
}

// ~~

function IsRoughlyNullVector2(
    vector,
    precision = DefaultPrecision
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        );
}

// ~~

function IsRoughlySameVector2(
    first_vector,
    second_vector,
    precision = DefaultPrecision
    )
{
    var
        x = first_vector[ 0 ] - second_vector[ 0 ],
        y = first_vector[ 1 ] - second_vector[ 1 ]

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        );
}

// ~~

function GetVector2SquareLength(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ];

    return x * x + y * y;
}

// ~~

function GetVector2Length(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ];

    return GetSquareRoot( x * x + y * y );
}

// ~~

function GetNegatedVector2(
    vector
    )
{
    return Float32Array.of(
        -vector[ 0 ],
        -vector[ 1 ]
        );
}

// ~~

function GetScaledVector2(
    vector,
    scale
    )
{
    return Float32Array.of(
        vector[ 0 ] * scale,
        vector[ 1 ] * scale
        );
}

// ~~

function GetSumVector2(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] + second_vector[ 0 ],
        first_vector[ 1 ] + second_vector[ 1 ]
        );
}

// ~~

function GetDifferenceVector2(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] - second_vector[ 0 ],
        first_vector[ 1 ] - second_vector[ 1 ]
        );
}

// ~~

function GetNormalizedVector2(
    vector,
    precision = DefaultPrecision
    )
{
    var
        length,
        square_length,
        x = vector[ 0 ],
        y = vector[ 1 ];

    square_length = x * x + y * y;

    if ( square_length <= precision )
    {
        return Float32Array.of(
            0.0,
            0.0
            );
    }
    else
    {
        one_over_length = 1.0 / GetSquareRoot( square_length );

        return Float32Array.of(
            x * one_over_length,
            y * one_over_length
            );
    }
}

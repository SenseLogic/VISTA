// -- FUNCTIONS

function GetVector4(
    x = 0.0,
    y = 0.0,
    z = 0.0,
    w = 0.0
    )
{
    return Float32Array.of( x, z, z, w );
}

// ~~

function GetNullVector4(
    )
{
    return Float32Array.of( 0.0, 0.0, 0.0, 0.0 );
}

// ~~

function GetIdentityVector4(
    )
{
    return Float32Array.of( 1.0, 1.0, 1.0, 1.0 );
}

// ~~

function IsNullVector4(
    vector
    )
{
    return (
        vector[ 0 ] === 0.0
        && vector[ 1 ] === 0.0
        && vector[ 2 ] === 0.0
        && vector[ 3 ] === 0.0
        );
}

// ~~

function IsRoughlyNullVector4(
    vector,
    precision = DefaultPrecision
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        w = vector[ 3 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        && z >= -precision
        && z <= precision
        && w >= -precision
        && w <= precision
        );
}

// ~~

function IsSameVector4(
    first_vector,
    second_vector
    )
{
    return (
        first_vector[ 0 ] === second_vector[ 0 ]
        && first_vector[ 1 ] === second_vector[ 1 ]
        && first_vector[ 2 ] === second_vector[ 2 ]
        && first_vector[ 3 ] === second_vector[ 3 ]
        );
}

// ~~

function IsRoughlySameVector4(
    first_vector,
    second_vector,
    precision = DefaultPrecision
    )
{
    var
        x = first_vector[ 0 ] - second_vector[ 0 ],
        y = first_vector[ 1 ] - second_vector[ 1 ],
        z = first_vector[ 2 ] - second_vector[ 2 ],
        w = first_vector[ 3 ] - second_vector[ 3 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        && z >= -precision
        && z <= precision
        && w >= -precision
        && w <= precision
        );
}

// ~~

function GetVector4SquareLength(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        w = vector[ 3 ];

    return x * x + y * y + z * z + w * w;
}

// ~~

function GetVector4Length(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        w = vector[ 3 ];

    return GetSquareRoot( x * x + y * y + z * z + w * w );
}

// ~~

function GetOppositeVector4(
    vector
    )
{
    return Float32Array.of(
        -vector[ 0 ],
        -vector[ 1 ],
        -vector[ 2 ],
        -vector[ 3 ]
        );
}

// ~~

function GetScaledVector4(
    vector,
    factor
    )
{
    return Float32Array.of(
        vector[ 0 ] * factor,
        vector[ 1 ] * factor,
        vector[ 2 ] * factor,
        vector[ 3 ] * factor
        );
}

// ~~

function GetSumVector4(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] + second_vector[ 0 ],
        first_vector[ 1 ] + second_vector[ 1 ],
        first_vector[ 2 ] + second_vector[ 2 ],
        first_vector[ 3 ] + second_vector[ 3 ]
        );
}

// ~~

function GetScaledSumVector4(
    first_vector,
    second_vector,
    first_vector_factor,
    second_vector_factor
    )
{
    return Float32Array.of(
        first_vector[ 0 ] * first_vector_factor + second_vector[ 0 ] * second_vector_factor,
        first_vector[ 1 ] * first_vector_factor + second_vector[ 1 ] * second_vector_factor,
        first_vector[ 2 ] * first_vector_factor + second_vector[ 2 ] * second_vector_factor,
        first_vector[ 3 ] * first_vector_factor + second_vector[ 3 ] * second_vector_factor
        );
}

// ~~

function GetDifferenceVector4(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] - second_vector[ 0 ],
        first_vector[ 1 ] - second_vector[ 1 ],
        first_vector[ 2 ] - second_vector[ 2 ],
        first_vector[ 3 ] - second_vector[ 3 ]
        );
}

// ~~

function GetNormalizedVector4(
    vector,
    precision = DefaultPrecision
    )
{
    var
        one_over_length,
        square_length,
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        w = vector[ 3 ];

    square_length = x * x + y * y + z * z + w * w;

    if ( square_length <= precision )
    {
        return Float32Array.of(
            0.0,
            0.0,
            0.0,
            0.0
            );
    }
    else
    {
        one_over_length = 1.0 / GetSquareRoot( square_length );

        return Float32Array.of(
            x * one_over_length,
            y * one_over_length,
            z * one_over_length,
            w * one_over_length
            );
    }
}

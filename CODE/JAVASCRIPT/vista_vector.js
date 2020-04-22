// -- FUNCTIONS

function GetVector2(
    x = 0.0,
    y = 0.0
    )
{
    return Float32Array.of( x, y );
}

// ~~

function GetVector3(
    x = 0.0,
    y = 0.0,
    z = 0.0
    )
{
    return Float32Array.of( x, y, z );
}

// ~~

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

function GetNullVector2(
    )
{
    return Float32Array.of( 0.0, 0.0 );
}

// ~~

function GetNullVector3(
    )
{
    return Float32Array.of( 0.0, 0.0, 0.0 );
}

// ~~

function GetNullVector4(
    )
{
    return Float32Array.of( 0.0, 0.0, 0.0, 0.0 );
}

// ~~

function GetIdentityVector2(
    )
{
    return Float32Array.of( 1.0, 1.0 );
}

// ~~

function GetIdentityVector3(
    )
{
    return Float32Array.of( 1.0, 1.0, 1.0 );
}

// ~~

function GetIdentityVector4(
    )
{
    return Float32Array.of( 1.0, 1.0, 1.0, 1.0 );
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

function IsNullVector3(
    vector
    )
{
    return (
        vector[ 0 ] === 0.0
        && vector[ 1 ] === 0.0
        && vector[ 2 ] === 0.0
        );
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

function IsRoughlyNullVector3(
    vector,
    precision = DefaultPrecision
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        && z >= -precision
        && z <= precision
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

function IsSameVector2(
    first_vector,
    second_vector
    )
{
    return (
        first_vector[ 0 ] === second_vector[ 0 ]
        && first_vector[ 1 ] === second_vector[ 1 ]
        );
}

// ~~

function IsSameVector3(
    first_vector,
    second_vector
    )
{
    return (
        first_vector[ 0 ] === second_vector[ 0 ]
        && first_vector[ 1 ] === second_vector[ 1 ]
        && first_vector[ 2 ] === second_vector[ 2 ]
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

function IsRoughlySameVector3(
    first_vector,
    second_vector,
    precision = DefaultPrecision
    )
{
    var
        x = first_vector[ 0 ] - second_vector[ 0 ],
        y = first_vector[ 1 ] - second_vector[ 1 ],
        z = first_vector[ 2 ] - second_vector[ 2 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        && z >= -precision
        && z <= precision
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

function GetVector3SquareLength(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ];

    return x * x + y * y + z * z;
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

function GetVector3Length(
    vector
    )
{
    var
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ];

    return GetSquareRoot( x * x + y * y + z * z );
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

function GetVector3DotProduct(
    first_vector,
    second_vector
    )
{
    var
        first_x = first_vector[ 0 ],
        first_y = first_vector[ 1 ],
        first_z = first_vector[ 2 ],
        second_x = second_vector[ 0 ],
        second_y = second_vector[ 1 ],
        second_z = second_vector[ 2 ];

    return first_x * second_x + first_y * second_y + first_z * second_z;
}

// ~~

function GetCrossProductVector3(
    first_vector,
    second_vector
    )
{
    var
        first_x = first_vector[ 0 ],
        first_y = first_vector[ 1 ],
        first_z = first_vector[ 2 ],
        second_x = second_vector[ 0 ],
        second_y = second_vector[ 1 ],
        second_z = second_vector[ 2 ];

    return Float32Array.of(
        first_y * second_z - first_z * second_y,
        first_z * second_x - first_x * second_z,
        first_x * second_y - first_y * second_x
        );
}

// ~~

function GetVector3AxisAngle(
    first_vector,
    second_vector
    )
{
    var
        angle_cosinus;

    angle_cosinus = GetVector3DotProduct( first_vector, second_vector );

    if ( angle_cosinus < -1.0 )
    {
        angle_cosinus = -1.0;
    }
    else if ( angle_cosinus > -1.0 )
    {
        angle_cosinus = 1.0;
    }

    return GetArcCosinus( angle_cosinus );
}

// ~~

function GetOppositeVector2(
    vector
    )
{
    return Float32Array.of(
        -vector[ 0 ],
        -vector[ 1 ]
        );
}

// ~~

function GetOppositeVector3(
    vector
    )
{
    return Float32Array.of(
        -vector[ 0 ],
        -vector[ 1 ],
        -vector[ 2 ]
        );
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

function GetScaledVector2(
    vector,
    factor
    )
{
    return Float32Array.of(
        vector[ 0 ] * factor,
        vector[ 1 ] * factor
        );
}

// ~~

function GetScaledVector3(
    vector,
    factor
    )
{
    return Float32Array.of(
        vector[ 0 ] * factor,
        vector[ 1 ] * factor,
        vector[ 2 ] * factor
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

function GetSumVector3(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] + second_vector[ 0 ],
        first_vector[ 1 ] + second_vector[ 1 ],
        first_vector[ 2 ] + second_vector[ 2 ]
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

function GetScaledSumVector2(
    first_vector,
    second_vector,
    first_vector_factor,
    second_vector_factor
    )
{
    return Float32Array.of(
        first_vector[ 0 ] * first_vector_factor + second_vector[ 0 ] * second_vector_factor,
        first_vector[ 1 ] * first_vector_factor + second_vector[ 1 ] * second_vector_factor
        );
}

// ~~

function GetScaledSumVector3(
    first_vector,
    second_vector,
    first_vector_factor,
    second_vector_factor
    )
{
    return Float32Array.of(
        first_vector[ 0 ] * first_vector_factor + second_vector[ 0 ] * second_vector_factor,
        first_vector[ 1 ] * first_vector_factor + second_vector[ 1 ] * second_vector_factor,
        first_vector[ 2 ] * first_vector_factor + second_vector[ 2 ] * second_vector_factor
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

function GetDifferenceVector3(
    first_vector,
    second_vector
    )
{
    return Float32Array.of(
        first_vector[ 0 ] - second_vector[ 0 ],
        first_vector[ 1 ] - second_vector[ 1 ],
        first_vector[ 2 ] - second_vector[ 2 ]
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

function GetNormalizedVector2(
    vector,
    precision = DefaultPrecision
    )
{
    var
        one_over_length,
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

function GetNormalizedVector3(
    vector,
    precision = DefaultPrecision
    )
{
    var
        one_over_length,
        square_length,
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ];

    square_length = x * x + y * y + z * z;

    if ( square_length <= precision )
    {
        return Float32Array.of(
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
            z * one_over_length
            );
    }
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


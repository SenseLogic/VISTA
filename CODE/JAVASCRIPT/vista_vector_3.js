// -- FUNCTIONS

function GetVector3(
    x = 0.0,
    y = 0.0,
    z = 0.0
    )
{
    return Float32Array.of(
        x,
        y,
        z
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

function GetNegatedVector3(
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

function GetScaledVector3(
    vector,
    scale
    )
{
    return Float32Array.of(
        vector[ 0 ] * scale,
        vector[ 1 ] * scale,
        vector[ 2 ] * scale
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

function GetNormalizedVector3(
    vector,
    precision = DefaultPrecision
    )
{
    var
        length,
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

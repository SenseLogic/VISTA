// -- FUNCTIONS

function GetQuaternion(
    x = 0.0,
    y = 0.0,
    z = 0.0,
    w = 1.0
    )
{
    return Float32Array.of( x, y, z, w );
}

// ~~

function GetIdentityQuaternion(
    )
{
    return Float32Array.of( 0.0, 0.0, 0.0, 1.0 );
}

// ~~

function IsIdentityQuaternion(
    quaternion
    )
{
    return (
        quaternion[ 0 ] === 0.0
        && quaternion[ 1 ] === 0.0
        && quaternion[ 2 ] === 0.0
        && quaternion[ 3 ] === 1.0
        );
}

// ~~

function IsRoughlyIdentityQuaternion(
    quaternion,
    precision = DefaultPrecision
    )
{
    var
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ],
        w = quaternion[ 3 ];

    return (
        x >= -precision
        && x <= precision
        && y >= -precision
        && y <= precision
        && z >= -precision
        && z <= precision
        && w >= 1.0 - precision
        && w <= 1.0 + precision
        );
}

// ~~

function IsSameQuaternion(
    first_quaternion,
    second_quaternion
    )
{
    return (
        first_quaternion[ 0 ] === second_quaternion[ 0 ]
        && first_quaternion[ 1 ] === second_quaternion[ 1 ]
        && first_quaternion[ 2 ] === second_quaternion[ 2 ]
        && first_quaternion[ 3 ] === second_quaternion[ 3 ]
        );
}

// ~~

function IsRoughlySameQuaternion(
    first_quaternion,
    second_quaternion,
    precision = DefaultPrecision
    )
{
    var
        x = first_quaternion[ 0 ] - second_quaternion[ 0 ],
        y = first_quaternion[ 1 ] - second_quaternion[ 1 ],
        z = first_quaternion[ 2 ] - second_quaternion[ 2 ],
        w = first_quaternion[ 3 ] - second_quaternion[ 3 ];

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

function IsSimilarQuaternion(
    first_quaternion,
    second_quaternion
    )
{
    var
        first_x = first_quaternion[ 0 ],
        first_y = first_quaternion[ 1 ],
        first_z = first_quaternion[ 2 ],
        first_w = first_quaternion[ 3 ],
        second_x = second_quaternion[ 0 ],
        second_y = second_quaternion[ 1 ],
        second_z = second_quaternion[ 2 ],
        second_w = second_quaternion[ 3 ];

    return (
        ( first_x == second_x
          && first_y == second_y
          && first_z == second_z
          && first_w == second_w )
        || ( first_x == -second_x
             && first_y == -second_y
             && first_z == -second_z
             && first_w == -second_w )
        );
}

// ~~

function IsRoughlySimilarQuaternion(
    first_quaternion,
    second_quaternion,
    precision = DefaultPrecision
    )
{
    var
        first_x = first_quaternion[ 0 ],
        first_y = first_quaternion[ 1 ],
        first_z = first_quaternion[ 2 ],
        first_w = first_quaternion[ 3 ],
        second_x = second_quaternion[ 0 ],
        second_y = second_quaternion[ 1 ],
        second_z = second_quaternion[ 2 ],
        second_w = second_quaternion[ 3 ];

    return (
        ( IsRoughlySame( first_x, second_x, precision )
          && IsRoughlySame( first_y, second_y, precision )
          && IsRoughlySame( first_z, second_z, precision )
          && IsRoughlySame( first_w, second_w, precision ) )
        || ( IsRoughlySame( first_x, -second_x, precision )
             && IsRoughlySame( first_y, -second_y, precision )
             && IsRoughlySame( first_z, -second_z, precision )
             && IsRoughlySame( first_w, -second_w, precision ) )
        );
}

// ~~

function GetInverseQuaternion(
    quaternion
    )
{
    return Float32Array.of(
        -quaternion[ 0 ],
        -quaternion[ 1 ],
        -quaternion[ 2 ],
        quaternion[ 3 ]
        );
}
// ~~

function GetQuaternionAngle(
    quaternion
    )
{
    return GetArcCosinus( quaternion[ 3 ] ) * 2.0;
}

// ~~

function GetQuaternionAxisVector(
    quaternion
    )
{
    var
        one_over_length,
        square_length,
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ];

    square_length = x * x + y * y + z * z;

    if ( IsRoughlyZero( square_length ) )
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

function GetQuaternionXAxisVector(
    quaternion
    )
{
    var
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ],
        w = quaternion[ 3 ];

    return Float32Array.of(
        ( y * y ) * -2.0 + ( z * z ) * -2.0 + 1.0,
        ( x * y + w * z ) * 2.0,
        ( x * z - w * y ) * 2.0
        );
}

// ~~

function GetQuaternionYAxisVector(
    quaternion
    )
{
    var
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ],
        w = quaternion[ 3 ];

    return Float32Array.of(
        ( x * y - w * z ) * 2.0,
        ( x * x ) * -2.0 + ( z * z ) * -2.0 + 1.0,
        ( y * z + w * x ) * 2.0
        );
}

// ~~

function GetQuaternionZAxisVector(
    quaternion
    )
{
    var
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ],
        w = quaternion[ 3 ];

    return Float32Array.of(
        ( x * z + w * y ) * 2.0,
        ( y * z - w * x ) * 2.0,
        ( x * x ) * -2.0 + ( y * y ) * -2.0 + 1.0
        );
}

// ~~

function GetXRotationQuaternion(
    x_angle
    )
{
    var
        half_x_angle;

    if ( x_angle == 0.0 )
    {
        return Float32Array.of(
            0.0,
            0.0,
            0.0,
            1.0
            );
    }
    else
    {
        half_x_angle = x_angle * 0.5;

        return Float32Array.of(
            GetSinus( half_x_angle ),
            0.0,
            0.0,
            GetCosinus( half_x_angle )
            );
    }
}

// ~~

function GetYRotationQuaternion(
    y_angle
    )
{
    var
        half_y_angle;

    if ( y_angle == 0.0 )
    {
        return Float32Array.of(
            0.0,
            0.0,
            0.0,
            1.0
            );
    }
    else
    {
        half_y_angle = y_angle * 0.5;

        return Float32Array.of(
            0.0,
            GetSinus( half_y_angle ),
            0.0,
            GetCosinus( half_y_angle )
            );
    }
}

// ~~

function GetZRotationQuaternion(
    z_angle
    )
{
    var
        half_z_angle;

    if ( z_angle == 0.0 )
    {
        return Float32Array.of(
            0.0,
            0.0,
            0.0,
            1.0
            );
    }
    else
    {
        half_z_angle = z_angle * 0.5;

        return Float32Array.of(
            0.0,
            0.0,
            GetSinus( half_z_angle ),
            GetCosinus( half_z_angle )
            );
    }
}

// ~~

function GetZxyRotationQuaternion(
    zxy_rotation_vector
    )
{
    var
        half_x_angle = zxy_rotation_vector[ 0 ] * 0.5,
        half_y_angle = zxy_rotation_vector[ 1 ] * 0.5,
        half_z_angle = zxy_rotation_vector[ 2 ] * 0.5,
        half_x_cosinus = GetCosinus( half_x_angle ),
        half_x_sinus = GetSinus( half_x_angle ),
        half_y_cosinus = GetCosinus( half_y_angle ),
        half_y_sinus = GetSinus( half_y_angle ),
        half_z_cosinus = GetCosinus( half_z_angle ),
        half_z_sinus = GetSinus( half_z_angle );

    return Float32Array.of(
        half_y_cosinus * half_x_sinus * half_z_cosinus + half_y_sinus * half_x_cosinus * half_z_sinus,
        -half_y_cosinus * half_x_sinus * half_z_sinus + half_y_sinus * half_x_cosinus * half_z_cosinus,
        half_y_cosinus * half_x_cosinus * half_z_sinus - half_y_sinus * half_x_sinus * half_z_cosinus,
        half_y_cosinus * half_x_cosinus * half_z_cosinus + half_y_sinus * half_x_sinus * half_z_sinus
        );
}

// ~~

function GetProductQuaternion(
    first_quaternion,
    second_quaternion
    )
{
    var
        first_x = first_quaternion[ 0 ],
        first_y = first_quaternion[ 1 ],
        first_z = first_quaternion[ 2 ],
        first_w = first_quaternion[ 3 ],
        second_x = second_quaternion[ 0 ],
        second_y = second_quaternion[ 1 ],
        second_z = second_quaternion[ 2 ],
        second_w = second_quaternion[ 3 ];

    return Float32Array.of(
        first_w * second_x + first_x * second_w + first_y * second_z - first_z * second_y,
        first_w * second_y - first_x * second_z + first_y * second_w + first_z * second_x,
        first_w * second_z + first_x * second_y - first_y * second_x + first_z * second_w,
        first_w * second_w - first_x * second_x - first_y * second_y - first_z * second_z
        );
}

// ~~

function GetQuaternionMatrix4(
    quaternion
    )
{
   var
        x = quaternion[ 0 ],
        y = quaternion[ 1 ],
        z = quaternion[ 2 ],
        w = quaternion[ 3 ],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx2 = x * x2,
        xy2 = x * y2,
        xz2 = x * z2,
        yy2 = y * y2,
        yz2 = y * z2,
        zz2 = z * z2,
        wx2 = w * x2,
        wy2 = w * y2,
        wz2 = w * z2;

    return Float32Array.of(
        1.0 - yy2 - zz2,
        xy2 + wz2,
        xz2 - wy2,
        0.0,
        xy2 - wz2,
        1.0 - xx2 - zz2,
        yz2 + wx2,
        0.0,
        xz2 + wy2,
        yz2 - wx2,
        1.0 - xx2 - yy2,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0
        );
}

// ~~

function GetQuaternionZxyRotationVector(
    quaternion
    )
{
    var
        rotated_quaternion,
        x_angle,
        x_axis_vector,
        y_angle,
        z_angle,
        z_axis_vector;

    rotated_quaternion = quaternion.slice();
    z_axis_vector = GetQuaternionZAxisVector( rotated_quaternion );

    if ( IsRoughlyZero( z_axis_vector[ 2 ] )
         && IsRoughlyZero( z_axis_vector[ 0 ] ) )
    {
        y_angle = 0.0;
    }
    else
    {
        y_angle = GetVectorAngle( z_axis_vector[ 2 ], z_axis_vector[ 0 ] );

        rotated_quaternion
            = GetProductQuaternion(
                  GetYRotationQuaternion( -y_angle ),
                  rotated_quaternion
                  );
    }

    z_axis_vector = GetQuaternionZAxisVector( rotated_quaternion );

    if ( IsRoughlyZero( z_axis_vector[ 2 ] )
         && IsRoughlyZero( z_axis_vector[ 1 ] ) )
    {
        x_angle = 0.0;
    }
    else
    {
        x_angle = -GetVectorAngle( z_axis_vector[ 2 ], z_axis_vector[ 1 ] );

        rotated_quaternion
            = GetProductQuaternion(
                  GetXRotationQuaternion( -x_angle ),
                  rotated_quaternion
                  );
    }

    x_axis_vector = GetQuaternionXAxisVector( rotated_quaternion );

    if ( IsRoughlyZero( x_axis_vector[ 0 ] )
         && IsRoughlyZero( x_axis_vector[ 1 ] ) )
    {
        z_angle = 0.0;
    }
    else
    {
        z_angle = GetVectorAngle( x_axis_vector[ 0 ], x_axis_vector[ 1 ] );
    }

    return Float32Array.of( x_angle, y_angle, z_angle );
}

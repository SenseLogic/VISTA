// -- FUNCTIONS

function GetQuaternion(
    x = 0.0,
    y = 0.0,
    z = 0.0,
    w = 1.0
    )
{
    return Float32Array.of(
        x,
        y,
        z
        );
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

function GetQuaternionXAxis(
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

function GetQuaternionYAxis(
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

function GetQuaternionZAxis(
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

function GetQuaternionAngle(
    quaternion
    )
{
    return GetArcCosinus( quaternion[ 3 ] ) * 2.0;
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

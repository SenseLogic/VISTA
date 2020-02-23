// -- FUNCTIONS

function GetQuaternion(
    x = 0.0,
    y = 0.0,
    z = 0.0,
    w = 1.0
    )
{
    return [ x, y, z ];
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

    return [
        ( y * y ) * -2.0 + ( z * z ) * -2.0 + 1.0,
        ( x * y + w * z ) * 2.0,
        ( x * z - w * y ) * 2.0
        ];
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

    return [
        ( x * y - w * z ) * 2.0,
        ( x * x ) * -2.0 + ( z * z ) * -2.0 + 1.0,
        ( y * z + w * x ) * 2.0
        ]
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

    return [
        ( x * z + w * y ) * 2.0,
        ( y * z - w * x ) * 2.0,
        ( x * x ) * -2.0 + ( y * y ) * -2.0 + 1.0
        ];
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
        return [
            0.0,
            0.0,
            0.0,
            1.0
            ];
    }
    else
    {
        half_x_angle = x_angle * 0.5;

        return [
            GetSinus( half_x_angle ),
            0.0,
            0.0,
            GetCosinus( half_x_angle )
            ];
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
        return [
            0.0,
            0.0,
            0.0,
            1.0
            ];
    }
    else
    {
        half_y_angle = y_angle * 0.5;

        return [
            0.0,
            GetSinus( half_y_angle ),
            0.0,
            GetCosinus( half_y_angle )
            ];
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
        return [
            0.0,
            0.0,
            0.0,
            1.0
            ];
    }
    else
    {
        half_z_angle = z_angle * 0.5;

        return [
            0.0,
            0.0,
            GetSinus( half_z_angle ),
            GetCosinus( half_z_angle )
            ];
    }
}

// ~~

function GetZxyRotationQuaternion(
    z_angle,
    x_angle,
    y_angle
    )
{
    var
        half_z_angle = z_angle * 0.5,
        half_x_angle = x_angle * 0.5,
        half_y_angle = y_angle * 0.5,
        half_z_cosinus = GetCosinus( half_z_angle ),
        half_z_sinus = GetSinus( half_z_angle ),
        half_x_cosinus = GetCosinus( half_x_angle ),
        half_x_sinus = GetSinus( half_x_angle ),
        half_y_cosinus = GetCosinus( half_y_angle ),
        half_y_sinus = GetSinus( half_y_angle );

    return [
        half_y_cosinus * half_x_sinus * half_z_cosinus + half_y_sinus * half_x_cosinus * half_z_sinus,
        -half_y_cosinus * half_x_sinus * half_z_sinus + half_y_sinus * half_x_cosinus * half_z_cosinus,
        half_y_cosinus * half_x_cosinus * half_z_sinus - half_y_sinus * half_x_sinus * half_z_cosinus,
        half_y_cosinus * half_x_cosinus * half_z_cosinus + half_y_sinus * half_x_sinus * half_z_sinus
        ];
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

    return [
        first_w * second_x + first_x * second_w + first_y * second_z - first_z * second_y,
        first_w * second_y - first_x * second_z + first_y * second_w + first_z * second_x,
        first_w * second_z + first_x * second_y - first_y * second_x + first_z * second_w,
        first_w * second_w - first_x * second_x - first_y * second_y - first_z * second_z
        ];
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
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    return [
        1.0 - yy - zz,
        xy + wz,
        xz - wy,
        0.0,
        xy - wz,
        1.0 - xx - zz,
        yz + wx,
        0.0,
        xz + wy,
        yz - wx,
        1.0 - xx - yy,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0
        ];
}
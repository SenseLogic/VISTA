// -- FUNCTIONS

var GetPositive = Math.abs;
var GetSign = Math.sign;
var GetFloorInteger = Math.floor;
var GetCeilingInteger = Math.ceil;
var GetRoundInteger = Math.round;
var GetSquareRoot = Math.sqrt;
var GetCosinus = Math.cos;
var GetSinus = Math.sin;
var GetTangent = Math.tan;
var GetArcCosinus = Math.acos;
var GetArcSinus = Math.asin;
var GetArcTangent = Math.atan;
var GetRandom = Math.random;

// ~~

function GetVector3(
    x = 0.0,
    y = 0.0,
    z = 0.0
    )
{
    return [ x, y, z ];
}

// ~~

function GetVector4(
    x = 0.0,
    y = 0.0,
    z = 0.0,
    w = 0.0
    )
{
    return [ x, y, z ];
}

// ~~

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

// ~~

function GetMatrix4(
    xx = 1.0,
    xy = 0.0,
    xz = 0.0,
    xw = 0.0,
    yx = 0.0,
    yy = 1.0,
    yz = 0.0,
    yw = 0.0,
    zx = 0.0,
    zy = 0.0,
    zz = 1.0,
    zw = 0.0,
    wx = 0.0,
    wy = 0.0,
    wz = 0.0,
    ww = 1.0
    )
{
    return [
        xx, xy, xz, xw,
        yx, yy, yz, xw,
        zx, zy, zz, xw,
        wx, wy, wz, xw
        ];
}

// ~~

function GetIdentityMatrix4(
    )
{
    return [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
        ];
}

// ~~

function GetXRotationMatrix4(
    angle
    )
{
    return [
        1.0, 0.0, 0.0, 0.0,
        0.0, GetCosinus( angle ), -GetSinus( angle ), 0.0,
        0.0, GetSinus( angle ), GetCosinus( angle ), 0.0,
        0.0, 0.0, 0.0, 1.0
        ];
}

// ~~

function GetYRotationMatrix4( angle )
{
    return [
        GetCosinus( angle ), 0.0, GetSinus( angle ), 0.0,
        0.0, 1.0, 0.0, 0.0,
        -GetSinus( angle ), 0.0, GetCosinus( angle ), 0.0,
        0.0, 0.0, 0.0, 1.0
        ];
}

// ~~

function GetZRotationMatrix4( angle )
{
    return [
        GetCosinus( angle ), -GetSinus( angle ), 0.0, 0.0,
        GetSinus( angle ), GetCosinus( angle ), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
        ];
}

// ~~

function GetTranslationMatrix4(x, y, z)
{
    return [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0
        ];
}

// ~~

function GetScalingMatrix4(x, y, z)
{
    return [
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1.0
        ];
}

// ~~

function GetMatrix4TransformedVector3(
    matrix,
    vector
    )
{
    var
        xx = matrix[ 0 ],
        xy = matrix[ 1 ],
        xz = matrix[ 2 ],
        xw = matrix[ 3 ],
        yx = matrix[ 4 ],
        yy = matrix[ 5 ],
        yz = matrix[ 6 ],
        yw = matrix[ 7 ],
        zx = matrix[ 8 ],
        zy = matrix[ 9 ],
        zz = matrix[ 10 ],
        zw = matrix[ 11 ],
        wx = matrix[ 12 ],
        wy = matrix[ 13 ],
        wz = matrix[ 14 ],
        ww = matrix[ 15 ],
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        one_over_w = 1.0 / ( x * xw + y * yw + z * zw + ww );

    return [
        ( x * xx + y * yx + z * zx + wx ) * one_over_w,
        ( x * xy + y * yy + z * zy + wy ) * one_over_w,
        ( x * xz + y * yz + z * zz + wz ) * one_over_w
        ]
}

// ~~

function GetMatrix4TransformedVector4(
    matrix,
    vector
    )
{
    var
        xx = matrix[ 0 ],
        xy = matrix[ 1 ],
        xz = matrix[ 2 ],
        xw = matrix[ 3 ],
        yx = matrix[ 4 ],
        yy = matrix[ 5 ],
        yz = matrix[ 6 ],
        yw = matrix[ 7 ],
        zx = matrix[ 8 ],
        zy = matrix[ 9 ],
        zz = matrix[ 10 ],
        zw = matrix[ 11 ],
        wx = matrix[ 12 ],
        wy = matrix[ 13 ],
        wz = matrix[ 14 ],
        ww = matrix[ 15 ],
        x = vector[ 0 ],
        y = vector[ 1 ],
        z = vector[ 2 ],
        w = vector[ 3 ];

    return [
        x * xx + y * yx + z * zx + w * wx,
        x * xy + y * yy + z * zy + w * wy,
        x * xz + y * yz + z * zz + w * wz,
        x * xw + y * yw + z * zw + w * ww
        ]
}

// ~~

function GetProductMatrix4(
    first_matrix,
    second_matrix
    )
{
    var
        first_xx = first_matrix[ 0 ],
        first_xy = first_matrix[ 1 ],
        first_xz = first_matrix[ 2 ],
        first_xw = first_matrix[ 3 ],
        first_yx = first_matrix[ 4 ],
        first_yy = first_matrix[ 5 ],
        first_yz = first_matrix[ 6 ],
        first_yw = first_matrix[ 7 ],
        first_zx = first_matrix[ 8 ],
        first_zy = first_matrix[ 9 ],
        first_zz = first_matrix[ 10 ],
        first_zw = first_matrix[ 11 ],
        first_wx = first_matrix[ 12 ],
        first_wy = first_matrix[ 13 ],
        first_wz = first_matrix[ 14 ],
        first_ww = first_matrix[ 15 ],
        second_xx = second_matrix[ 0 ],
        second_xy = second_matrix[ 1 ],
        second_xz = second_matrix[ 2 ],
        second_xw = second_matrix[ 3 ],
        second_yx = second_matrix[ 4 ],
        second_yy = second_matrix[ 5 ],
        second_yz = second_matrix[ 6 ],
        second_yw = second_matrix[ 7 ],
        second_zx = second_matrix[ 8 ],
        second_zy = second_matrix[ 9 ],
        second_zz = second_matrix[ 10 ],
        second_zw = second_matrix[ 11 ],
        second_wx = second_matrix[ 12 ],
        second_wy = second_matrix[ 13 ],
        second_wz = second_matrix[ 14 ],
        second_ww = second_matrix[ 15 ];

    return [
        first_xx * second_xx + first_xy * second_yx + first_xz * second_zx + first_xw * second_wx,
        first_xx * second_xy + first_xy * second_yy + first_xz * second_zy + first_xw * second_wy,
        first_xx * second_xz + first_xy * second_yz + first_xz * second_zz + first_xw * second_wz,
        first_xx * second_xw + first_xy * second_yw + first_xz * second_zw + first_xw * second_ww,
        first_yx * second_xx + first_yy * second_yx + first_yz * second_zx + first_yw * second_wx,
        first_yx * second_xy + first_yy * second_yy + first_yz * second_zy + first_yw * second_wy,
        first_yx * second_xz + first_yy * second_yz + first_yz * second_zz + first_yw * second_wz,
        first_yx * second_xw + first_yy * second_yw + first_yz * second_zw + first_yw * second_ww,
        first_zx * second_xx + first_zy * second_yx + first_zz * second_zx + first_zw * second_wx,
        first_zx * second_xy + first_zy * second_yy + first_zz * second_zy + first_zw * second_wy,
        first_zx * second_xz + first_zy * second_yz + first_zz * second_zz + first_zw * second_wz,
        first_zx * second_xw + first_zy * second_yw + first_zz * second_zw + first_zw * second_ww,
        first_wx * second_xx + first_wy * second_yx + first_wz * second_zx + first_ww * second_wx,
        first_wx * second_xy + first_wy * second_yy + first_wz * second_zy + first_ww * second_wy,
        first_wx * second_xz + first_wy * second_yz + first_wz * second_zz + first_ww * second_wz,
        first_wx * second_xw + first_wy * second_yw + first_wz * second_zw + first_ww * second_ww
        ];
}

// ~~

function GetZxyRotationMatrix4(
    z_angle,
    x_angle,
    y_angle
    )
{
    var
        z_cosinus = GetCosinus( z_angle ),
        z_sinus = GetSinus( z_angle ),
        x_cosinus = GetCosinus( x_angle ),
        x_sinus = GetSinus( x_angle ),
        y_cosinus = GetCosinus( y_angle ),
        y_sinus = GetSinus( y_angle );

    return [
        z_cosinus * y_cosinus + z_sinus * x_sinus * y_sinus,
        z_sinus * x_cosinus,
        -z_cosinus * y_sinus + z_sinus * x_sinus * y_cosinus,
        0.0,
        -z_sinus * y_cosinus + z_cosinus * x_sinus * y_sinus,
        z_cosinus * x_cosinus,
        z_sinus * y_sinus + z_cosinus * x_sinus * y_cosinus,
        0.0,
        x_cosinus * y_sinus,
        -x_sinus,
        x_cosinus * y_cosinus,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0
        ];
}

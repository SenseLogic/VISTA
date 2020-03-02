// -- FUNCTIONS

var DefaultPrecision = 0.00001;
var Pi = Math.PI;
var GetPositive = Math.abs;
var GetSign = Math.sign;
var GetFloor = Math.floor;
var GetCeil = Math.ceil;
var GetRound = Math.round;
var GetSquareRoot = Math.sqrt;
var GetCosinus = Math.cos;
var GetSinus = Math.sin;
var GetTangent = Math.tan;
var GetArcCosinus = Math.acos;
var GetArcSinus = Math.asin;
var GetArcTangent = Math.atan;
var GetRandom = Math.random;

// ~~

function IsRoughlyNull(
    value,
    precision = DefaultPrecision
    )
{
    return (
        value >= -precision
        && value <= precision
        );
}

// ~~

function IsRoughlySame(
    first_value,
    second_value,
    precision = DefaultPrecision
    )
{
    var
        value = first_value - second_value;

    return (
        value >= -precision
        && value <= precision
        );
}

// ~~

function GetClamp(
    value,
    minimum_value,
    maximum_value
    )
{
    if ( value < minimum_value )
    {
        return minimum_value;
    }
    else if ( value > maximum_value )
    {
        return maximum_value;
    }
    else
    {
        return value;
    }
}

// ~~

function GetRadianAngle(
    degree_angle
    )
{
    return degree_angle * ( Pi / 180.0 );
}

// ~~

function GetDegreeAngle(
    radian_angle
    )
{
    return radian_angle * ( 180.0 / Pi );
}

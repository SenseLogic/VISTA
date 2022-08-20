// -- TYPES

class VISTA_CLOCK
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Time = 0.0;
        this.TimeStep = 0.0;
    }

    // -- OPERATIONS

    Set(
        time
        )
    {
        if ( this.Time !== 0.0 )
        {
            this.TimeStep = time - this.Time;
        }

        this.Time = time;
    }
}

// -- FUNCTIONS

function GetMillisecondTimestamp(
    )
{
    return window.performance.timing.navigationStart + window.performance.now();
}

// ~~

function GetLocalDateTime(
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getFullYear(),
        Month : date.getMonth(),
        Day : date.getDay(),
        Hour : date.getHours(),
        Minute : date.getMinutes(),
        Second : date.getSeconds()
        };
}

// ~~

function GetUniversalDateTime(
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getUTCFullYear(),
        Month : date.getUTCMonth(),
        Day : date.getUTCDay(),
        Hour : date.getUTCHours(),
        Minute : date.getUTCMinutes(),
        Second : date.getUTCSeconds()
        };
}

// ~~

function GetDateTimeText(
    date
    )
{
    return (
        date.Year.toString().GetLeftPaddedText( 4, "0" )
        + ":"
        + date.Month.toString().GetLeftPaddedText( 2, "0" )
        + ":"
        + date.Day.toString().GetLeftPaddedText( 2, "0" )
        + " "
        + date.Hour.toString().GetLeftPaddedText( 2, "0" )
        + "-"
        + date.Minute.toString().GetLeftPaddedText( 2, "0" )
        + "-"
        + date.Second.toString().GetLeftPaddedText( 2, "0" )
        );
}

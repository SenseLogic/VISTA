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

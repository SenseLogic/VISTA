// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.ConsumerArray = [];
        this.HasChanged = true;
    }

    // -- INQUIRIES

    FindConsumerIndex(
        consumer
        )
    {
        var
            consumer_index;

        for ( consumer_index = 0;
              consumer_index < this.ConsumerArray.length;
              ++consumer_index )
        {
            if ( this.ConsumerArray[ consumer_index ] === consumer )
            {
                return consumer_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddConsumer(
        consumer
        )
    {
        if ( this.FindConsumerIndex( consumer ) < 0 )
        {
            this.ConsumerArray.push( consumer );
        }
    }

    // ~~

    RemoveConsumer(
        consumer
        )
    {
        var
            consumer_index;

        consumer_index = this.FindConsumerIndex( consumer );

        if ( consumer_index >= 0 )
        {
            this.ConsumerArray.splice( consumer_index, 1 );
        }
    }

    // ~~

    SetChanged(
        )
    {
        var
            consumer;

        this.HasChanged = true;

        for ( consumer of this.ConsumerArray )
        {
            consumer.OnDataChanged( this );
        }
    }

    // ~~

    OnDataChanged(
        data
        )
    {
        this.HasChanged = true;
    }
}

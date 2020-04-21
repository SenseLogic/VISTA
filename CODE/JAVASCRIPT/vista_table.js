// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.ObserverArray = [];
    }

    // -- INQUIRIES

    FindObserverIndex(
        observer
        )
    {
        var
            observer_index;

        for ( observer_index = 0;
              observer_index < this.ObserverArray.length;
              ++observer_index )
        {
            if ( this.ObserverArray[ observer_index ] === observer )
            {
                return observer_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddObserver(
        observer
        )
    {
        if ( this.FindObserverIndex( observer ) < 0 )
        {
            this.ObserverArray.push( observer );
        }
    }

    // ~~

    RemoveObserver(
        observer
        )
    {
        var
            observer_index;

        observer_index = this.FindObserverIndex( observer );

        if ( observer_index >= 0 )
        {
            this.ObserverArray.splice( observer_index, 1 );
        }
    }

    // ~~

    NotifyDataChanged(
        )
    {
        var
            observer;

        for ( observer of this.ObserverArray )
        {
            observer.OnDataChanged( this );
        }
    }
}

// ~~

class VISTA_TABLE extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        data_class,
        key_property_name,
        stored_property_name_array,
        request_url
        )
    {
        this.DataClass = data_class;
        this.DataMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.StoredPropertyNameArray = stored_property_name_array;
        this.RequestUrl = request_url;
    }

    // -- OPERATIONS

    CreateStoredData(
        data
        )
    {
        var
            stored_data,
            stored_property_name;

        stored_data = {};

        for ( stored_property_name of this.StoredPropertyNameArray )
        {
            stored_data[ stored_property_name ] = data[ stored_property_name ];
        }

        return stored_data;
    }

    // ~~

    CopyData(
        data,
        other_data
        )
    {
        var
            property_name;

        for ( property_name of other_data )
        {
            data[ property_name ] = other_data[ property_name ];
        }
    }

    // ~~

    CreateData(
        other_data
        )
    {
        var
            data;

        data = new this.DataClass();

        if ( other_data !== null )
        {
            CopyData( data, other_data );
        }

        return data;
    }

    // ~~

    GetData(
        data_key
        )
    {
        var
            data;

        data = this.DataMap.get( data_key );

        if ( data === undefined )
        {
            return null;
        }
        else
        {
            return data;
        }
    }

    // ~~

    SetData(
        data
        )
    {
        var
            data_key,
            set_data;

        data_key = data[ this.KeyPropertyName ];
        set_data = this.DataMap.get( data_key );

        if ( set_data === undefined )
        {
            set_data = new this.DataClass();
        }

        if ( set_data !== data )
        {
            CopyData( set_data, data );
            this.DataMap.set( data_key, set_data );
        }

        set_data.NotifyDataChanged();
        this.NotifyDataChanged();
    }

    // ~~

    ClearDataArray(
        )
    {
        var
            removed_data,
            removed_data_map;

        removed_data_map = this.DataMap;
        this.DataMap = new Map();

        for ( removed_data of removed_data_map.values() )
        {
            removed_data.NotifyDataChanged();
        }

        this.NotifyDataChanged();
    }

    // ~~

    SetDataArray(
        data_array
        )
    {
        var
            data;

        for ( data of data_array )
        {
            SetData( data );
        }
    }

    // ~~

    RemoveData(
        data_key
        )
    {
        var
            removed_data;

        removed_data = this.DataMap.get( data_key );
        this.DataMap.delete( data_key );

        removed_data.NotifyDataChanged();
        this.NotifyDataChanged();
    }

    // ~~

    async GetStoredDataArray(
        )
    {
        var
            data_array;

        data_array = await SendJsonRequest( request_url, "GET" );

        ClearDataArray();
        SetDataArray( data_array );

        return data_array;
    }

    // ~~

    async GetStoredData(
        data_key
        )
    {
        var
            data;

        data = await SendJsonRequest( request_url + "/" + data_key, "GET" );

        SetData( data );

        return data;
    }

    // ~~

    async AddStoredData(
        data
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "POST", CreateStoredData( data ) );

        SetData( data );
    }

    // ~~

    async SetStoredData(
        data
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "PUT", CreateStoredData( data ) );

        SetData( data );
    }

    // ~~

    async RemoveStoredData(
        data_key
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "DELETE", null );

        RemoveData( data_key );
    }
}

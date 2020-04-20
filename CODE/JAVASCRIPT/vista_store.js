// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.ListenerArray = [];
    }

    // -- INQUIRIES

    FindListenerIndex(
        listener
        )
    {
        var
            listener_index;

        for ( listener_index = 0;
              listener_index < this.ListenerArray.length;
              ++listener_index )
        {
            if ( this.ListenerArray[ listener_index ] === listener )
            {
                return listener_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddListener(
        listener
        )
    {
        if ( this.FindListenerIndex( listener ) < 0 )
        {
            this.ListenerArray.push( listener );
        }
    }

    // ~~

    RemoveListener(
        listener
        )
    {
        var
            listener_index;

        listener_index = this.FindListenerIndex( listener );

        if ( listener_index >= 0 )
        {
            this.ListenerArray.splice( listener_index, 1 );
        }
    }

    // ~~

    NotifyDataChanged(
        )
    {
        var
            listener;

        for ( listener of this.ListenerArray )
        {
            listener.OnDataChanged( this );
        }
    }
}

// ~~

class VISTA_STORE extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        name,
        data_class,
        key_property_name,
        remote_property_name_array,
        request_url
        )
    {
        this.Name = name;
        this.DataClass = data_class;
        this.DataMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.RemotePropertyNameArray = remote_property_name_array;
        this.RequestUrl = request_url;
    }

    // -- OPERATIONS

    CreateRemoteData(
        data
        )
    {
        var
            remote_data,
            remote_property_name;

        remote_data = {};

        for ( remote_property_name of this.RemotePropertyNameArray )
        {
            remote_data[ remote_property_name ] = data[ remote_property_name ];
        }

        return remote_data;
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

    async GetRemoteDataArray(
        )
    {
        var
            data_array;

        await data_array = SendJsonRequest( request_url, "GET" );

        ClearDataArray();
        SetDataArray( data_array );

        return data_array;
    }

    // ~~

    async GetRemoteData(
        data_key
        )
    {
        var
            data;

        await data = SendJsonRequest( request_url + "/" + data_key, "GET" );

        SetData( data );

        return data;
    }

    // ~~

    async AddRemoteData(
        data
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "POST", CreateRemoteData( data ) );

        SetData( data );
    }

    // ~~

    async SetRemoteData(
        data
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "PUT", CreateRemoteData( data ) );

        SetData( data );
    }

    // ~~

    async RemoveRemoteData(
        data_key
        )
    {
        await SendJsonRequest( request_url + "/" + data_key, "DELETE", null );

        RemoveData( data_key );
    }
}

// -- TYPES

class VISTA_OBSERVABLE
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

    NotifyObservableChanged(
        change_name,
        detail_object
        )
    {
        var
            observer;

        for ( observer of this.ObserverArray )
        {
            observer.OnObservableChanged( this );
        }
    }
}

// ~~

class VISTA_STORE extends VISTA_OBSERVABLE
{
    // -- CONSTRUCTORS

    constructor(
        name,
        object_class,
        key_property_name,
        remote_property_name_array,
        request_url
        )
    {
        this.Name = name;
        this.ObjectClass = object_class;
        this.ObjectMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.RemotePropertyNameArray = remote_property_name_array;
        this.RequestUrl = request_url;
    }

    // -- OPERATIONS

    CreateRemoteObject(
        object
        )
    {
        var
            remote_object,
            remote_property_name;

        remote_object = {};

        for ( remote_property_name of this.RemotePropertyNameArray )
        {
            remote_object[ remote_property_name ] = object[ remote_property_name ];
        }

        return remote_object;
    }

    // ~~

    CopyObject(
        object,
        other_object
        )
    {
        var
            property_name;

        for ( property_name of other_object )
        {
            object[ property_name ] = other_object[ property_name ];
        }
    }

    // ~~

    CreateObject(
        other_object
        )
    {
        var
            object;

        object = new this.ObjectClass();

        if ( other_object !== null )
        {
            CopyObject( object, other_object );
        }

        return object;
    }

    // ~~

    GetObject(
        object_key
        )
    {
        var
            object;

        object = this.ObjectMap.get( object_key );

        if ( object === undefined )
        {
            return null;
        }
        else
        {
            return object;
        }
    }

    // ~~

    SetObject(
        object
        )
    {
        var
            object_key,
            set_object;

        object_key = object[ this.KeyPropertyName ];
        set_object = this.ObjectMap.get( object_key );

        if ( set_object === undefined )
        {
            set_object = new this.ObjectClass();
        }

        if ( set_object !== object )
        {
            CopyObject( set_object, object );
            this.ObjectMap.set( object_key, set_object );
        }

        set_object.NotifyObservableChanged();
        this.NotifyObservableChanged();
    }

    // ~~

    ClearObjectArray(
        )
    {
        var
            removed_object,
            removed_object_map;

        removed_object_map = this.ObjectMap;
        this.ObjectMap = new Map();

        for ( removed_object of removed_object_map.values() )
        {
            removed_object.NotifyObservableChanged();
        }

        this.NotifyObservableChanged();
    }

    // ~~

    SetObjectArray(
        object_array
        )
    {
        var
            object;

        for ( object of object_array )
        {
            SetObject( object );
        }
    }

    // ~~

    RemoveObject(
        object_key
        )
    {
        var
            removed_object;

        removed_object = this.ObjectMap.get( object_key );
        this.ObjectMap.delete( object_key );

        removed_object.NotifyObservableChanged( "RemoveObject" );
        this.NotifyObservableChanged( "RemoveObject" );
    }

    // ~~

    async GetRemoteObjectArray(
        )
    {
        var
            object_array;

        await object_array = SendJsonRequest( request_url, "GET" );

        ClearObjectArray();
        SetObjectArray( object_array );

        return object_array;
    }

    // ~~

    async GetRemoteObject(
        object_key
        )
    {
        var
            object;

        await object = SendJsonRequest( request_url + "/" + object_key, "GET" );

        SetObject( object );

        return object;
    }

    // ~~

    async AddRemoteObject(
        object
        )
    {
        await SendJsonRequest( request_url + "/" + object_key, "POST", CreateRemoteObject( object ) );

        SetObject( object );
    }

    // ~~

    async SetRemoteObject(
        object
        )
    {
        await SendJsonRequest( request_url + "/" + object_key, "PUT", CreateRemoteObject( object ) );

        SetObject( object );
    }

    // ~~

    async RemoveRemoteObject(
        object_key
        )
    {
        await SendJsonRequest( request_url + "/" + object_key, "DELETE", null );

        RemoveObject( object_key );
    }
}

// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.WatcherArray = [];
        this.HasChanged = false;
        this.IsChangingWatchers = false;
    }

    // -- INQUIRIES

    FindWatcherIndex(
        watcher
        )
    {
        var
            watcher_index;

        for ( watcher_index = 0;
              watcher_index < this.WatcherArray.length;
              ++watcher_index )
        {
            if ( this.WatcherArray[ watcher_index ] === watcher )
            {
                return watcher_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddWatcher(
        watcher
        )
    {
        if ( this.FindWatcherIndex( watcher ) < 0 )
        {
            this.WatcherArray.AddLastValue( watcher );
        }
    }

    // ~~

    RemoveWatcher(
        watcher
        )
    {
        var
            watcher_index;

        watcher_index = this.FindWatcherIndex( watcher );

        if ( watcher_index >= 0 )
        {
            this.WatcherArray.splice( watcher_index, 1 );
        }
    }

    // ~~

    WatchData(
        data
        )
    {
        data.AddWatcher( this );
    }

    // ~~

    UnwatchData(
        data
        )
    {
        data.RemoveWatcher( this );
    }

    // ~~

    ChangeWatchers(
        )
    {
        var
            watcher;

        if ( !this.IsChangingWatchers )
        {
            this.IsChangingWatchers = true;

            for ( watcher of this.WatcherArray )
            {
                watcher.SetChanged();
            }

            this.IsChangingWatchers = false;
        }
    }

    // ~~

    SetChanged(
        )
    {
        this.HasChanged = true;
        this.ChangeWatchers();
    }

    // ~~

    SetUpdated(
        )
    {
        this.HasChanged = false;
        this.IsChangingWatchers = false;
    }
}

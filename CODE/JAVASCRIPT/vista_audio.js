// -- TYPES

class AUDIO_PLAYER
{
    // -- CONSTRUCTORS

    constructor(
        source_path
        )
    {
        this.SourcePath = source_path;
        this.AudioElement = new Audio( source_path );
    }

    // -- INQUIRIES

    GetDuration(
        )
    {
        return this.AudioElement.duration;
    }

    // ~~

    GetTime(
        )
    {
        return this.AudioElement.currentTime;
    }

    // ~~

    GetSpeed(
        )
    {
        return this.AudioElement.playbackRate;
    }

    // ~~

    GetVolume(
        )
    {
        return this.AudioElement.volume;
    }

    // ~~

    IsPaused(
        )
    {
        return this.AudioElement.paused;
    }

    // ~~

    IsLoop(
        )
    {
        return this.AudioElement.loop;
    }

    // ~~

    IsMuted(
        )
    {
        return this.AudioElement.muted;
    }

    // ~~

    IsEnded(
        )
    {
        return this.AudioElement.ended;
    }

    // -- OPERATIONS

    AddPlayEventListener(
        called_function
        )
    {
        this.AudioElement.addEventListener( "play", called_function );
    }

    // ~~

    AddPauseEventListener(
        called_function
        )
    {
        this.AudioElement.addEventListener( "pause", called_function );
    }

    // ~~

    AddTimeUpdateEventListener(
        called_function
        )
    {
        this.AudioElement.addEventListener( "timeupdate", called_function );
    }

    // ~~

    AddVolumeChangeEventListener(
        called_function
        )
    {
        this.AudioElement.addEventListener( "volumechange", called_function );
    }

    // ~~

    AddEndedEventListener(
        called_function
        )
    {
        this.AudioElement.addEventListener( "ended", called_function );
    }

    // ~~

    Play(
        )
    {
        this.AudioElement.play();
    }

    // ~~

    Pause(
        )
    {
        this.AudioElement.pause();
    }

    // ~~

    TogglePause(
        )
    {
        if ( this.AudioElement.paused )
        {
            this.AudioElement.play();
        }
        else
        {
            this.AudioElement.pause();
        }
    }

    // ~~

    SetTime(
        time
        )
    {
        this.AudioElement.currentTime = time;
    }

    // ~~

    SetSpeed(
        rate
        )
    {
        this.AudioElement.playbackRate = rate;
    }

    // ~~

    SetVolume(
        rate
        )
    {
        this.AudioElement.playbackRate = rate;
    }

    // ~~

    SetIsLoop(
        is_loop
        )
    {
        this.AudioElement.loop = is_loop;
    }

    // ~~

    SetIsMuted(
        is_muted
        )
    {
        this.AudioElement.muted = is_muted;
    }
}

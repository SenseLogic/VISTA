// -- VARIABLES

var
    VideoIntersectionObserver;

// -- FUNCTIONS

HTMLElement.prototype.SetVideoIsMuted = function (
    video_is_muted = true
    )
{
    this.muted = video_is_muted;

    return this;
}

// ~~

HTMLElement.prototype.ToggleVideoIsMuted = function (
    )
{
    this.muted = !this.muted;

    return this;
}

// ~~

HTMLElement.prototype.StartVideo = function (
    current_time = 0,
    video_is_muted = undefined
    )
{
    if ( video_is_muted !== undefined )
    {
        this.muted = video_is_muted;
    }

    this.currentTime = current_time;
    this.load();
    this.play().catch( ( error ) => {} );

    return this;
}

// ~~

HTMLElement.prototype.PauseVideo = function (
    video_is_muted = undefined
    )
{
    if ( video_is_muted !== undefined )
    {
        this.muted = video_is_muted;
    }

    this.pause();

    return this;
}

// ~~

HTMLElement.prototype.SetVideoIsPaused = function (
    video_is_paused = true
    )
{
    if ( video_is_paused )
    {
        this.pause();
    }
    else
    {
        this.play();
    }

    return this;
}

// ~~

HTMLElement.prototype.ToggleVideoIsPaused = function (
    )
{
    if ( this.paused )
    {
        this.play();
    }
    else
    {
        this.pause();
    }

    return this;
}

// ~~

function CreateVideoIntersectionObserver(
    )
{
    return (
        new IntersectionObserver(
            function (
                intersection_observer_entry_array,
                intersection_observer
                )
            {
                var
                    intersection_observer_entry,
                    query_character_index,
                    video_element,
                    video_path,
                    video_path_entry,
                    video_path_entry_array,
                    video_query,
                    video_source;

                for ( intersection_observer_entry of intersection_observer_entry_array )
                {
                    video_element = intersection_observer_entry.target;

                    if ( intersection_observer_entry.intersectionRatio > 0 )
                    {
                        if ( video_element.paused
                             && !video_element.classList.contains( "is-hidden" ) )
                        {
                            video_source = "";
                            video_path_entry_array = video_element.dataset.videoPath.split( "|" );

                            for ( video_path_entry of video_path_entry_array )
                            {
                                query_character_index = video_path_entry.indexOf( "@" );

                                if ( query_character_index >= 0 )
                                {
                                    video_path = video_path_entry.substring( 0, query_character_index );
                                    video_query = video_path_entry.substring( query_character_index + 1 );
                                }
                                else
                                {
                                    video_path = video_path_entry;
                                    video_query = "";
                                }

                                if ( video_query === ""
                                     || window.matchMedia( "(" + video_query + ")" ).matches )
                                {
                                    video_source = video_path;
                                }
                            }

                            if ( video_source !== "" )
                            {
                                video_element.src = video_source;
                                video_element.autoplay = true;
                                video_element.play();
                            }
                        }
                    }
                    else
                    {
                        if ( !video_element.paused )
                        {
                            video_element.autoplay = false;
                            video_element.pause();
                        }
                    }
                }
            },
            {
                root: null,
                threshold : 0
            }
            )
        );
}

// ~~

HTMLElement.prototype.AutoplayVideo = function (
    )
{
    if ( VideoIntersectionObserver === undefined )
    {
        VideoIntersectionObserver = CreateVideoIntersectionObserver();
    }

    VideoIntersectionObserver.observe( this );

    return this;
}

// ~~

Array.prototype.AutoplayVideos = function (
    )
{
    var
        video_element;

    for ( video_element of this )
    {
        video_element.AutoplayVideo();
    }

    return this;
}

// ~~

function InitializeAutoplayVideos(

    )
{
    GetElements( ".autoplay-video" ).AutoplayVideos();
}

// ~~

function FinalizeAutoplayVideos(
    )
{
    VideoIntersectionObserver.disconnect();
}

// ~~

function DisableVideoContextMenu(
    )
{
    GetElements( "video" ).AddEventListener(
        "contextmenu",
        function (
            event
            )
        {
            event.preventDefault();
        }
        );
}

// ~~

HTMLElement.prototype.AutohideVideo = function (
    )
{
    var
        video_element_is_hidden;

    video_element_is_hidden = window.matchMedia( "(" + this.dataset.autohideCondition + ")" ).matches;

    this.ToggleClass( "is-hidden", video_element_is_hidden );
    this.autoplay = !video_element_is_hidden;

    return this;
}

// ~~

Array.prototype.AutohideVideos = function (
    )
{
    var
        video_element;

    for ( video_element of this )
    {
        video_element.AutohideVideo();
    }

    return this;
}

// ~~

function InitializeAutohideVideos(

    )
{
    GetElements( ".autohide-video" ).AutohideVideos();
}

// -- VARIABLES

var
    AutoplayIntersectionObserver;

// -- FUNCTIONS

HTMLElement.prototype.StartVideo = function (
    video_is_muted = undefined
    )
{
    if ( video_is_muted !== undefined )
    {
        this.muted = video_is_muted;
    }

    this.currentTime = 0;
    this.load();
    this.play().catch( ( error ) => { } );
}

// ~~

HTMLElement.prototype.StartUnmutedVideo = function (
    )
{
    this.muted = false;
    this.currentTime = 0;
    this.load();
    this.play().catch( ( error ) => { } );
}

// ~~

HTMLElement.prototype.PauseVideo = function (
    )
{
    this.muted = true;
    this.pause();
}

// ~~

function CreateAutoplayIntersectionObserver(
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
                    video_element;

                for ( intersection_observer_entry of intersection_observer_entry_array )
                {
                    video_element = intersection_observer_entry.target;

                    if ( intersection_observer_entry.intersectionRatio > 0 )
                    {
                        if ( video_element.paused
                             && !video_element.classList.contains( "is-hidden" ) )
                        {
                            video_element.muted = true;
                            video_element.autoplay = true;
                            video_element.play();
                        }
                    }
                    else
                    {
                        if ( !video_element.paused )
                        {
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
    if ( AutoplayIntersectionObserver === undefined )
    {
        AutoplayIntersectionObserver = CreateAutoplayIntersectionObserver();
    }

    AutoplayIntersectionObserver.observe( this );

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
    AutoplayIntersectionObserver.disconnect();
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

// -- VARIABLES

var
    YouTubeVideoApiIsReady = false,
    YouTubeVideoContentIsLoaded = false,
    YoutubeVideoIndex = 1,
    YoutubeVideoIntersectionObserver,
    YoutubeVideoPlayerByIdMap = new Map();

// -- FUNCTIONS

function CreateYoutubeVideoIntersectionObserver(
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
                    youtube_video_element,
                    youtube_video_id,
                    youtube_video_player;

                for ( intersection_observer_entry of intersection_observer_entry_array )
                {
                    youtube_video_element = intersection_observer_entry.target;

                    if ( intersection_observer_entry.intersectionRatio > 0 )
                    {
                        if ( YoutubeVideoPlayerByIdMap.has( youtube_video_element.id ) )
                        {
                            youtube_video_player = YoutubeVideoPlayerByIdMap.get( youtube_video_element.id );
                        }
                        else
                        {
                            youtube_video_id =  youtube_video_element.src.split( "https://www.youtube.com/embed/" )[ 1 ].split( "?" )[ 0 ];
                            youtube_video_player = new YT.Player( youtube_video_element.id, { videoId : youtube_video_id } );

                            YoutubeVideoPlayerByIdMap.set( youtube_video_element.id, youtube_video_player );
                        }

                        if ( youtube_video_player.unMute )
                        {
                            youtube_video_player.unMute();
                            youtube_video_player.playVideo();
                        }
                    }
                    else
                    {
                        if ( YoutubeVideoPlayerByIdMap.has( youtube_video_element.id ) )
                        {
                            youtube_video_player = YoutubeVideoPlayerByIdMap.get( youtube_video_element.id );

                            if ( youtube_video_player.mute )
                            {
                                youtube_video_player.mute();
                                youtube_video_player.pauseVideo();
                            }
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

HTMLElement.prototype.AutoplayYoutubeVideo = function (
    )
{
    if ( !this.id )
    {
        this.id = "autoplay-youtube-video-" + YoutubeVideoIndex;

        ++YoutubeVideoIndex;
    }

    if ( YoutubeVideoIntersectionObserver === undefined )
    {
        YoutubeVideoIntersectionObserver = CreateYoutubeVideoIntersectionObserver();
    }

    YoutubeVideoIntersectionObserver.observe( this );

    return this;
}

// ~~

Array.prototype.AutoplayYoutubeVideos = function (
    )
{
    var
        youtube_video_element;

    for ( youtube_video_element of this )
    {
        youtube_video_element.AutoplayYoutubeVideo();
    }

    return this;
}

// ~~

function AutoplayYoutubeVideos(
    )
{
    GetElements( ".autoplay-youtube-video" ).AutoplayYoutubeVideos();
}

// ~~

function onYouTubeIframeAPIReady(
    )
{
    if ( YouTubeVideoContentIsLoaded )
    {
        AutoplayYoutubeVideos();
    }

    YouTubeVideoApiIsReady = true;
}

// ~~

function InitializeAutoplayYoutubeVideos(
    )
{
    var
        first_script_element,
        script_element;

    YouTubeVideoContentIsLoaded = true;

    if ( YouTubeVideoApiIsReady )
    {
        AutoplayYoutubeVideos();
    }
    else
    {
        script_element = document.createElement( "script" );
        script_element.src = "https://www.youtube.com/iframe_api";

        first_script_element = document.getElementsByTagName( "script" )[ 0 ];
        first_script_element.parentNode.insertBefore( script_element, first_script_element );
    }
}

// ~~

function FinalizeAutoplayYoutubeVideos(
    )
{
    YoutubeVideoIntersectionObserver.disconnect();
}


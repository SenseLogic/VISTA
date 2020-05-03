![](https://github.com/senselogic/VISTA/blob/master/LOGO/vista.png)

# Vista

Lightweight CSS and JavaScript framework.

## Features

*   Stylus
    *   reset
    *   units
    *   media queries
    *   prefixes
    *   containers
    *   displays
    *   visibilities
    *   flexboxes
    *   grids
    *   gutters
    *   alignments
    *   widths
    *   heights
    *   borders
    *   margins
    *   paddings
    *   overflows
    *   positions
    *   backgrounds
    *   fonts
    *   texts
    *   cursors
    *   carousels
    *   parallaxes
*   JavaScript
    *   traversals
    *   manipulations
    *   animations
    *   components
    *   requests
    *   stores
    *   vectors
    *   matrices
    *   quaternions
    *   shaders
    *   loaders
    *   renderers

## Samples

### Traversals, manipulations and animations

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body style="font-family:monospace">
        <main>
            <div class="line">
                <div class="block" style="background-color:#FF0000">
                </div>
            </div>
            <div class="line">
                <div class="block" style="background-color:#00FF00">
                </div>
            </div>
            <div class="line">
                <div class="block" style="background-color:#0000FF">
                </div>
            </div>
        </main>
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_element.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_animation.js"></script>
        <script>
            // -- STATEMENTS

            GetElements( ".line" )
                .SetStyles(
                    {
                        "margin-top" : "2vw",
                        "width" : "100%",
                        "height" : "5vw",
                        "background-color" : "#EEE"
                    }
                    );

            GetElements( ".block" )
                .SetStyles(
                    {
                        "width" : "5vw",
                        "height" : "5vw"
                    }
                    )
                .AnimateStyles(
                    {
                        "transform" : [ "translateX(0vw)", "translateX(30vw)", "translateX(70vw)", "translateX(90vw)" ],
                        "opacity" : [ "1.0", "0.5", "0.1", "1.0" ]
                    },
                    [ 0.0, 2.0, 4.0, 6.0 ]
                    )
                .AnimateStyles(
                    {
                        "background-color" : [ "#FF8888", "#FFFF00", "#00FFFF", "#FF00FF" ]
                    },
                    [ 2.0, 4.0, 5.0, 6.0 ]
                    )
                .AnimateStyles(
                    {
                        "display" : [ "none", "block" ]
                    },
                    [ 2.5, 2.75 ]
                    )
                .AnimateStyles(
                    {
                        "width" : [ "2vw", "5vw" ]
                    },
                    [ 0.5, 1.0 ],
                    {
                        IsLooping : true,
                        Speed : 0.5
                    }
                    );

            DelayCall(
                function (
                    )
                {
                    GetElements( ".block" ).StopStyles();
                },
                6.0
                );

            GetElements( "div" )
                .Iterate(
                    function (
                        element,
                        element_index
                        )
                    {
                        WriteRow( element_index, element.classList );
                    }
                    )
                .Process(
                    function (
                        element_array
                        )
                    {
                        var
                            element;

                        for ( element of element_array )
                        {
                            WriteLine( element );
                        }
                    }
                    );
        </script>
    </body>
</html>
```

### Components

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body>
        <main style="font-family:monospace">
            <test-component click-count="1">
            </test-component>
        </main>
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_element.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_component.js"></script>
        <script>
            // -- TYPES

            class TEST_COMPONENT extends VISTA_COMPONENT
            {
                // -- INQUIRIES

                static get observedAttributes(
                    )
                {
                    return [ "text-color", "click-count" ];
                }

                // -- OPERATIONS

                SetTextColorProperty(
                    )
                {
                    this.SetProperty( "TextColor", "#" + GetByteArrayHexadecimalText( GetRandomByteArray( 3 ) ) );
                }

                // ~~

                SetClickCountProperty(
                    )
                {
                    this.SetProperty( "ClickCount", this.ClickCount + 1 );
                }

                // ~~

                SetClickCountAttribute(
                    )
                {
                    this.SetAttribute( "click-count", this.ClickCount + 1 );
                }

                // ~~

                InitializeComponent(
                    )
                {
                    this.MovieArray =
                        [
                            {
                                Name : "<Blade Runner>",
                                Rating : 5
                            },
                            {
                                Name : "<The Chronicles of Riddick>",
                                Rating : 4
                            },
                            {
                                Name : "<The Matrix>",
                                Rating : 3
                            }
                        ];

                    this.BindProperty( "TextColor", "text-color", "#0000ff" );
                    this.BindProperty( "ClickCount", "click-count", 0 );
                    this.BindMethod( "SetTextColorProperty" );
                    this.BindMethod( "SetClickCountProperty" );
                    this.BindMethod( "SetClickCountAttribute" );

                    this.AttachShadow();
                    this.SetTemplate(
                        Html`
                        <style>
                            :host .button
                            {
                                border: none;
                                border-radius: 0.5rem;
                                padding: 0.5rem 1rem;
                                background-color: <:# this.TextColor :>;
                                color: cyan;

                                @media above-30em and below-40em, above-50em
                                {
                                    color: white;
                                }

                                @media above-70em
                                {
                                    color: yellow;
                                }
                            }

                            :host .button
                            {
                                @media above-70em
                                {
                                    background-color: magenta;
                                }
                            }

                            @media above-80em
                            {
                                :host .button
                                {
                                    background-color: red;
                                }
                            }
                        </style>
                        <button id="property-button" class="button">
                            <:# this.TextColor :> : <:# this.ClickCount :>
                        </button>
                        <button id="attribute-button" class="button">
                            <:# this.TextColor :> : <:# this.ClickCount :>
                        </button>
                        <ul>
                            <: for ( var movie of this.MovieArray ) { :>
                                <li style="color:<:# this.TextColor :>">
                                    <:% movie.Name :> : <:# movie.Rating :>
                                </li>
                            <: } :>
                        </ul>
                        <div ignored="<\: ignored :\>">
                            <: var ignored = "<\: ignored :\>"; :>
                        </div>
                        `
                        );
                }

                // ~~

                UpdateComponent(
                    )
                {
                    super.UpdateComponent();

                    this.BindEvent( this.GetElements( ".button" ), "click", this.SetTextColorProperty );
                    this.BindEvent( this.GetElement( "#property-button" ), "click", this.SetClickCountProperty );
                    this.BindEvent( this.GetElement( "#attribute-button" ), "click", this.SetClickCountAttribute );
                }
            }

            // -- STATEMENTS

            DefineComponent( TEST_COMPONENT, "test-component" );
        </script>
    </body>
</html>
```

### Requests

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body style="font-family:monospace">
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_request.js"></script>
        <script>
            // -- FUNCTIONS

            async function Test(
                )
            {
                var
                    result,
                    user;

                result = await SendRequest(
                    "https://reqres.in/api/users/2",
                    "GET"
                    );
                WriteLine( result.response );

                result = await SendRequest(
                    "https://reqres.in/api/users",
                    "POST",
                    GetJsonText(
                        {
                            "name" : "Morpheus",
                            "job" : "leader"
                        }
                        ),
                    {
                        "Content-type" : "application/json; charset=UTF-8"
                    }
                    );
                WriteLine( result.response );

                user = await SendJsonRequest(
                    "https://reqres.in/api/users",
                    "POST",
                    {
                        "name" : "Morpheus",
                        "job" : "leader"
                    }
                    );
                WriteLine( user );
            }

            // -- STATEMENTS

            Test();
        </script>
    </body>
</html>
```

### Stores

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body style="font-family:monospace">
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_component.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_request.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_store.js"></script>
        <script>
            // -- TYPES

            class USER extends VISTA_DATA
            {
                // -- CONSTRUCTORS

                constructor(
                    )
                {
                    super();
                }
            }

            // ~~

            class USER_STORE extends VISTA_STORE
            {
                // -- CONSTRUCTORS

                constructor(
                    )
                {
                    super(
                        USER,
                        "id",
                        [ "id", "email", "first_name", "last_name", "avatar" ],
                        "https://reqres.in/api/users",
                        "User"
                        );

                    this.GetValueArrayPropertyName = "data";
                    this.GetValuePropertyName = "data";
                }
            }

            // -- FUNCTIONS

            async function Test(
                )
            {
                var
                    user,
                    user_array,
                    user_store;

                user_store = new USER_STORE();
                user_array = await user_store.GetUserArray( "?page=1" );

                for ( user of user_array )
                {
                    WriteRow( "GET", user );
                }

                user = await user_store.GetUser( 2 );
                WriteRow( "GET", user );

                user.email = "janet.weaver@yahoo.com";
                user = await user_store.SetUser( user );
                WriteRow( "PUT", user );

                user = await user_store.FixUser( { email : "janet.weaver@gmail.com" } );
                WriteRow( "PATCH", user );

                user = await user_store.AddUser(
                    {
                        email : "rick.deckard@live.com",
                        first_name : "Rick",
                        last_name : "Deckard",
                        avatar : "https://s3.amazonaws.com/uifaces/faces/twitter/rickdeckard/128.jpg",
                    }
                    );
                WriteRow( "POST", user );

                user = await user_store.RemoveUser( 2 );
                WriteRow( "DELETE", user );
            }

            // -- STATEMENTS

            Test();
        </script>
    </body>
</html>
```

### Shaders

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body>
        <main>
            <canvas id="canvas" width="640" height="480"></canvas>
        </main>
        <script src="../../../CODE/JAVASCRIPT/vista_element.js"></script>
        <script src="../../../CODE/JAVASCRIPT/vista_canvas.js"></script>
        <script id="vertex-shader" type="x-shader/x-vertex">
            attribute vec4 VertexPositionVectorAttribute;
            attribute vec4 VertexColorVectorAttribute;

            varying vec4 VertexColorVectorVarying;

            void main(
                )
            {
                gl_Position = VertexPositionVectorAttribute;
                VertexColorVectorVarying = VertexColorVectorAttribute;
            }
        </script>
        <script id="fragment-shader" type="x-shader/x-fragment">
            precision mediump float;

            varying vec4 VertexColorVectorVarying;

            void main(
                )
            {
                gl_FragColor = VertexColorVectorVarying;
            }
        </script>
        <script>
            // -- FUNCTIONS

            async function RenderColoredTriangle(
                )
            {
                var
                    canvas,
                    graphic_context,
                    fragment_shader,
                    program,
                    vertex_real_array_buffer,
                    vertex_shader;

                vertex_real_array_buffer
                    = new VISTA_REAL_32_ARRAY_BUFFER(
                          [
                              0.0, 0.5, 1.0, 0.0, 0.0,
                              -0.5, -0.5, 0.0, 1.0, 0.0,
                              0.5, -0.5, 0.0, 0.0, 1.0
                          ]
                          );

                vertex_shader = new VISTA_VERTEX_SHADER( GetElementById( "vertex-shader" ).text );
                fragment_shader = new VISTA_FRAGMENT_SHADER( GetElementById( "fragment-shader" ).text );

                program = new VISTA_PROGRAM( vertex_shader, fragment_shader );
                program.VertexPositionVectorAttribute = program.GetAttribute( "VertexPositionVectorAttribute" );
                program.VertexColorVectorAttribute = program.GetAttribute( "VertexColorVectorAttribute" );

                canvas = new VISTA_CANVAS( GetElementById( "canvas" ) );
                graphic_context = canvas.GraphicContext;

                vertex_real_array_buffer.Bind( graphic_context );

                vertex_shader.Bind( graphic_context );
                fragment_shader.Bind( graphic_context );

                program.Bind( graphic_context );
                program.VertexPositionVectorAttribute.Bind( graphic_context );
                program.VertexColorVectorAttribute.Bind( graphic_context );

                program.Use( graphic_context );
                program.VertexPositionVectorAttribute.BindReal32ArrayBuffer( graphic_context, vertex_real_array_buffer, 2, 5, 0 );
                program.VertexColorVectorAttribute.BindReal32ArrayBuffer( graphic_context, vertex_real_array_buffer, 3, 5, 2 );

                canvas.Clear( [ 0.9, 0.9, 0.9, 1.0 ] );
                canvas.DrawTriangles( 3 );
            }

            // -- STATEMENTS

            RenderColoredTriangle();
        </script>
    </body>
</html>
```

## Version

0.4

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU Lesser General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.

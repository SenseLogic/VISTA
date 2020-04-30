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

## Sample

### Traversals, manipulations and animations

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body>
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
                .SetProperties(
                    {
                        "margin-top" : "2vw",
                        "width" : "100%",
                        "height" : "5vw",
                        "background-color" : "#EEE"
                    }
                    );

            GetElements( ".block" )
                .SetProperties(
                    {
                        "width" : "5vw",
                        "height" : "5vw"
                    }
                    )
                .AnimateProperties(
                    {
                        "transform" : [ "translateX(0vw)", "translateX(30vw)", "translateX(70vw)", "translateX(90vw)" ],
                        "opacity" : [ "1.0", "0.5", "0.1", "1.0" ]
                    },
                    [ 0.0, 2.0, 4.0, 6.0 ]
                    )
                .AnimateProperties(
                    {
                        "background-color" : [ "#FF8888", "#FFFF00", "#00FFFF", "#FF00FF" ]
                    },
                    [ 2.0, 4.0, 5.0, 6.0 ]
                    )
                .AnimateProperties(
                    {
                        "display" : [ "none", "block" ]
                    },
                    [ 2.5, 2.75 ]
                    )
                .AnimateProperties(
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
                    GetElements( ".block" ).StopProperties();
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
                        Print( element_index, element.classList );
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
                            PrintElement( element );
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
        <main>
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
                    this.SetProperty( "ClickCount", this.Data.ClickCount + 1 );
                }

                // ~~

                SetClickCountAttribute(
                    )
                {
                    this.SetAttribute( "click-count", this.Data.ClickCount + 1 );
                }

                // ~~

                InitializeComponent(
                    )
                {
                    this.Data.MovieArray =
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

                    this.BindProperty( this.Data, "TextColor", "text-color", "#0000ff" );
                    this.BindProperty( this.Data, "ClickCount", "click-count", 0 );
                    this.BindMethod( this, "SetTextColorProperty" );
                    this.BindMethod( this, "SetClickCountProperty" );
                    this.BindMethod( this, "SetClickCountAttribute" );

                    this.AttachShadow();
                    this.SetTemplate(
                        Html`
                        <style>
                            :host .button
                            {
                                border: none;
                                border-radius: 0.5rem;
                                padding: 0.5rem 1rem;
                                background-color: <:# this.Data.TextColor :>;
                                color: cyan;

                                @media above-30em and below-40em, above-50em
                                {
                                    color: lightgrey;
                                }

                                @media above-60em
                                {
                                    color: white;
                                }
                            }

                            :host .button
                            {
                                @media above-60em
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
                            <:# this.Data.TextColor :> : <:# this.Data.ClickCount :>
                        </button>
                        <button id="attribute-button" class="button">
                            <:# this.Data.TextColor :> : <:# this.Data.ClickCount :>
                        </button>
                        <ul>
                            <: for ( var movie of this.Data.MovieArray ) { :>
                                <li style="color:<:# this.Data.TextColor :>">
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

### Stores

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
    </head>
    <body>
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_component.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_request.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_table.js"></script>
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

            class USER_TABLE extends VISTA_TABLE
            {
                // -- CONSTRUCTORS

                constructor(
                    )
                {
                    super(
                        USER,
                        "id",
                        [ "id", "email", "first_name", "last_name", "avatar" ],
                        "https://reqres.in/api/users"
                        );

                    this.GetValueArrayPropertyName = "data";
                    this.GetValuePropertyName = "data";
                }
            }

            // -- FUNCTIONS

            function Write(
                text
                )
            {
                document.write( "<pre>" + text + "</pre>" );
            }

            // ~~

            async function Test(
                )
            {
                var
                    user,
                    user_array,
                    user_table;

                user_table = new USER_TABLE();
                user_array = await user_table.GetStoredValueArray( "?page=1" );

                for ( user of user_array )
                {
                    Write( "GET " + GetJsonText( user ) );
                }

                user = await user_table.GetStoredValue( 2 );
                Write( "GET " + GetJsonText( user ) );

                user.email = "janet.weaver@yahoo.com";
                user = await user_table.SetStoredValue( user );
                Write( "PUT " + GetJsonText( user ) );

                user = await user_table.FixStoredValue( { email : "janet.weaver@gmail.com" } );
                Write( "PATCH " + GetJsonText( user ) );

                user = await user_table.AddStoredValue(
                    {
                        email : "rick.deckard@live.com",
                        first_name : "Rick",
                        last_name : "Deckard",
                        avatar : "https://s3.amazonaws.com/uifaces/faces/twitter/rickdeckard/128.jpg",
                    }
                    );
                Write( "POST " + GetJsonText( user ) );

                user = await user_table.RemoveStoredValue( 2 );
                Write( "DELETE " + GetJsonText( user ) );
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

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
    *   animations
    *   components
    *   templates
    *   requests
    *   tables
    *   proxies
    *   vectors
    *   matrices
    *   quaternions
    *   shaders
    *   loaders
    *   renderers

## Samples

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sample</title>
        <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    <body>
        <main>
            <test-element text-color="#0000ff">
            </test-element>
            <div class="line">
                <div class="block red-block">
                </div>
            </div>
            <div class="line">
                <div class="block green-block">
                </div>
            </div>
            <div class="line">
                <div class="block blue-block">
                </div>
            </div>
        </main>
        <script src="../../CODE/JAVASCRIPT/vista_base.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_element.js"></script>
        <script src="../../CODE/JAVASCRIPT/vista_animation.js"></script>
        <script>
            // -- TYPES

            class TEST_ELEMENT extends VISTA_ELEMENT
            {
                // -- CONSTRUCTORS

                constructor(
                    )
                {
                    super(
                        html`
                        <ul>
                            <: for ( var movie of this.Data.MovieArray ) { :>
                                <li style="color:<:# this.Data.TextColor :>">
                                    <:% movie.Name :> : <:# movie.Rating :>
                                </li>
                            <: } :>
                        </ul>
                        <button id="button">
                            <:# this.Data.TextColor :>
                        </button>
                        `
                        );
                }

                // -- OPERATIONS

                SetRandomTextColor(
                    )
                {
                    this.Data.TextColor = "#" + GetByteArrayHexadecimalText( GetRandomByteArray( 3 ) );
                    this.Data.SetChanged();
                    this.SetAttribute( "text-color", this.Data.TextColor );
                }

                // ~~

                InitializeElement(
                    )
                {
                    this.Data.TextColor = this.GetAttribute( "text-color", "#ff0000" );
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

                    this.SetRandomTextColor = this.SetRandomTextColor.bind( this );
                }

                // ~~

                UpdateElement(
                    )
                {
                    this.UpdateContent();
                    this.GetElement( "#button" ).AddEventListener( "click", this.SetRandomTextColor );
                }
            }

            // -- STATEMENTS

            DefineElement( TEST_ELEMENT, "test-element" );

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
                    );
        </script>
    </body>
</html>
```

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

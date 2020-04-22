![](https://github.com/senselogic/VISTA/blob/master/LOGO/vista.png)

# Vista

Modular CSS and JavaScript framework.

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
    *   document queries
    *   property animations
    *   custom elements
    *   HTML templating
    *   server requests
    *   relational tables
    *   mathematical types
    *   graphic shaders
    *   model loaders
    *   scene renderers

## Sample

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Sample</title>
        <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    <body>
        <main>
            <test-element>
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
                                <li style="color:<:# this.Data.LineColor :>">
                                    <:% movie.Name :> : <:# movie.Rating :>
                                </li>
                            <: } :>
                        </ul>
                        <button id="button">
                            <:# this.Data.LineColor :>
                        </button>
                        <div ignored="<\: ignored :\>">
                            <: var ignored = "<\: ignored :\>"; :>
                        </div>
                        `
                        );

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

                    this.Data.LineColor = "#0000FF";
                }

                // -- OPERATIONS

                ManageContentUpdated(
                    )
                {
                    var
                        self;

                    self = this;

                    [ this ].GetElements( "#button" ).AddEventListener(
                        "click",
                        function(
                            )
                        {
                            self.Data.LineColor = "#FF0000";
                            self.Data.SetChanged();
                        }
                        );
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
                        Log( element_index, element.classList );
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
                            LogElement( element );
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
                    );
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

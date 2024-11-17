// -- FUNCTIONS

function GetInitializedRisingTextFragment(
    text_node,
    word_wrapper_class = "rising-text-word-wrapper",
    word_class = "rising-text-word"
    )
{
    var
        fragment,
        word,
        word_array,
        word_element,
        word_wrapper_element;

    word_array = text_node.nodeValue.split( /(\s+)/ );
    fragment = document.createDocumentFragment();

    for ( word of word_array )
    {
        if ( word.trim() === "" )
        {
            fragment.appendChild( document.createTextNode( word ) );
        }
        else
        {
            word_wrapper_element = document.createElement( "span" );
            word_wrapper_element.className = word_wrapper_class;

            word_element = document.createElement( "span" );
            word_element.className = word_class;
            word_element.textContent = word;

            word_wrapper_element.appendChild( word_element );
            fragment.appendChild( word_wrapper_element );
        }
    }

    return fragment;
}

// ~~

function InitializeRisingTextElement(
    element,
    word_wrapper_class = "rising-text-word-wrapper",
    word_class = "rising-text-word"
    )
{
    var
        child_node,
        children_node_array;

    if ( element.nodeType === Node.TEXT_NODE )
    {
        element.parentNode.replaceChild(
            GetInitializedRisingTextFragment( element, word_wrapper_class, word_class ),
            element
            );
    }
    else if ( element.nodeType === Node.ELEMENT_NODE )
    {
        for ( child_node of Array.from( element.childNodes ) )
        {
            InitializeRisingTextElement( child_node, word_wrapper_class, word_class );
        }
    }
}

// ~~

function InitializeRisingTexts(
    element_selector = ".rising-text",
    root_element = undefined,
    word_wrapper_class = "rising-text-word-wrapper",
    word_class = "rising-text-word"
    )
{
    var
        rising_text_element;

    for ( rising_text_element of GetRootElement( root_element ).GetElements( element_selector ) )
    {
        InitializeRisingTextElement(
            rising_text_element,
            word_wrapper_class,
            word_class
            );
    }
}

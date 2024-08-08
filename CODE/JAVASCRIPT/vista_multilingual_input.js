// -- FUNCTIONS

function UpdateMultilingualInputTranslations(
    input_element,
    default_language_code = "en",
    translation_separator = "¨"
    )
{
    var
        language_code,
        translation,
        translation_array,
        translation_element,
        translation_index;

    translation_array =  input_element.value.split( translation_separator );

    for ( translation_element of input_element.TranslationElementArray )
    {
        language_code = translation_element.dataset.languageCode;

        for ( translation_index = 1;
              translation_index < translation_array.length;
              ++translation_index )
        {
            translation = translation_array[ translation_index ];

            if ( translation.slice( 0, 2 ) === language_code )
            {
                translation_element.value = translation.slice( 3 );

                break;
            }
        }

        if ( translation_index >= translation_array.length )
        {
            translation_element.value = translation_array[ 0 ];
        }
    }
}

// ~~

function UpdateMultilingualInput(
    input_element,
    translation_separator = "¨"
    )
{
    var
        default_translation,
        input_text,
        language_code,
        translation,
        translation_element;

    input_text = "";
    default_translation = null;

    for ( translation_element of input_element.TranslationElementArray )
    {
        language_code = translation_element.dataset.languageCode;

        if ( default_translation === null )
        {
            default_translation = translation_element.value;

            input_text = default_translation;
        }
        else
        {
            translation = translation_element.value;

            if ( translation !== default_translation )
            {
                input_text += "¨" + language_code + ":" + translation;
            }
        }
    }

    input_element.value = input_text;
}

// ~~

function HandleMultilingualInputTranslationInputEvent(
    event
    )
{
    UpdateMultilingualInput( event.currentTarget.InputElement );
}

// ~~

function InitializeMultilingualInputs(
    )
{
    var
        input_element,
        translation_element,
        translation_element_array;

    for ( input_element of GetElements( ".multilingual-input" ) )
    {
        translation_element_array = [];

        for ( translation_element = input_element.GetNextElement();
              translation_element !== null
              && translation_element.classList.contains( "multilingual-input-translation" );
              translation_element = translation_element.GetNextElement() )
        {
            translation_element.InputElement = input_element;
            translation_element.AddEventListener( "input", HandleMultilingualInputTranslationInputEvent );
            translation_element_array.push( translation_element );
        }

        input_element.TranslationElementArray = translation_element_array;

        UpdateMultilingualInputTranslations( input_element );
    }
}

// ~~

function FinalizeMultilingualInputs(
    )
{
    GetElements( ".multilingual-input-translation" ).RemoveEventListener( "input", HandleMultilingualInputTranslationInputEvent );
}

// -- FUNCTIONS

String.prototype.GetCapitalCaseText = function (
    )
{
    if ( this.length <= 1 )
    {
        return this.GetUpperCaseText();
    }
    else
    {
        return this.charAt( 0 ).GetUpperCaseText() + this.slice( 1 ).GetLowerCaseText();
    }
}

// ~~

String.prototype.GetTitleCaseText = function (
    prior_character_is_letter = false,
    separator_characters_are_kept = true
    )
{
    var
        character,
        lower_case_character,
        title_case_text,
        upper_case_character;

    title_case_text = "";

    for ( character of this )
    {
        lower_case_character = character.GetLowerCaseText();
        upper_case_character = character.GetUpperCaseText();

        if ( lower_case_character !== upper_case_character )
        {
            if ( prior_character_is_letter )
            {
                title_case_text += lower_case_character;
            }
            else
            {
                title_case_text += upper_case_character;
            }

            prior_character_is_letter = true;
        }
        else
        {
            if ( ( character >= "0"
                   && character <= "9" )
                 || separator_characters_are_kept )
            {
                title_case_text += character;
            }

            prior_character_is_letter = false;
        }
    }

    return title_case_text;
}

// ~~

String.prototype.GetPascalCaseText = function (
    prior_character_is_letter = false
    )
{
    return this.GetTitleCaseText( false, false );
}

// ~~

String.prototype.GetCamelCaseText = function (
    )
{
    return this.GetTitleCaseText( true, false );
}

// ~~

String.prototype.GetSnakeCaseText = function (
    separator_character = "_"
    )
{
    var
        character,
        character_array,
        character_count,
        character_index,
        character_is_lower_case,
        character_is_upper_case,
        character_is_digit,
        lower_case_character,
        next_character_is_lower_case,
        prior_character_is_lower_case,
        prior_character_is_upper_case,
        prior_character_is_digit,
        snake_case_text,
        upper_case_character;

    character_array = [];
    character_is_lower_case_array = [];
    character_is_upper_case_array = [];
    character_is_digit_array = [];

    for ( character of this.replace( "-", "_" ) )
    {
        character_array.AddLastValue( character );

        lower_case_character = character.GetLowerCaseText();
        upper_case_character = character.GetUpperCaseText();

        if ( lower_case_character !== upper_case_character )
        {
            character_is_lower_case_array.AddLastValue( character === lower_case_character );
            character_is_upper_case_array.AddLastValue( character === upper_case_character );
        }
        else
        {
            character_is_lower_case_array.AddLastValue( false );
            character_is_upper_case_array.AddLastValue( false );
        }

        character_is_digit_array.AddLastValue( character >= "0" && character <= "9" );
    }

    character_count = character_array.length;
    snake_case_text = "";
    prior_character_is_lower_case = false;
    prior_character_is_upper_case = false;
    prior_character_is_digit = false;

    for ( character_index = 0;
          character_index < character_count;
          ++character_index )
    {
        character = character_array[ character_index ];
        character_is_lower_case = character_is_lower_case_array[ character_index ];
        character_is_upper_case = character_is_upper_case_array[ character_index ];
        character_is_digit = character_is_digit_array[ character_index ];

        if ( character_index + 1 < character_count )
        {
            next_character_is_lower_case = character_is_lower_case_array[ character_index + 1 ];
        }
        else
        {
            next_character_is_lower_case = false;
        }

        if ( ( prior_character_is_lower_case
               && ( character_is_upper_case
                    || character_is_digit ) )
             || ( prior_character_is_digit
                  && ( character_is_lower_case
                       || character_is_upper_case ) )
             || ( prior_character_is_upper_case
                  && character_is_upper_case
                  && next_character_is_lower_case ) )
        {
            snake_case_text += separator_character;
        }

        snake_case_text += character;

        prior_character_is_lower_case = character_is_lower_case;
        prior_character_is_upper_case = character_is_upper_case;
        prior_character_is_digit = character_is_digit;
    }

    return snake_case_text.GetLowerCaseText();
}

// ~~

String.prototype.GetKebabCaseText = function (
    )
{
    return this.GetSnakeCaseText( "-" );
}

// ~~

String.prototype.GetFormText = function (
    )
{
    return this.replaceAll( "\r", "" );
}

// ~~

String.prototype.GetUntranslatedText = function (
    )
{
    return this.split( "¨" )[ 0 ];
}

// ~~

String.prototype.MatchesLanguages = function (
    language_specifier
    )
{
    var
        language_tag_part_array,
        language_specifier_tag,
        language_specifier_tag_part_array;

    language_tag_part_array = ( this + "--" ).split( "-" );

    for( language_specifier_tag of language_specifier.split( "," ) )
    {
        language_specifier_tag_part_array = ( language_specifier_tag + "--" ).split( "-" );

        if ( ( language_tag_part_array[ 0 ] === ""
               || language_specifier_tag_part_array[ 0 ] === ""
               || language_tag_part_array[ 0 ] === language_specifier_tag_part_array[ 0 ] )
             && ( language_tag_part_array[ 1 ] === ""
                  || language_specifier_tag_part_array[ 1 ] === ""
                  || language_tag_part_array[ 1 ] === language_specifier_tag_part_array[ 1 ] )
             && ( language_tag_part_array[ 2 ] === ""
                  || language_specifier_tag_part_array[ 2 ] === ""
                  || language_tag_part_array[ 2 ] === language_specifier_tag_part_array[ 2 ] ) )
        {
            return true;
        }
    }

    return false;
}

// ~~

String.prototype.GetTranslatedText = function(
    language_tag,
    default_language_tag = "en"
    )
{
    var
        colon_character_index,
        translated_text,
        translated_text_array;

    translated_text_array = this.split( "¨" );

    if ( language_tag !== default_language_tag )
    {
        for ( translated_text_index = translated_text_array.length - 1;
              translated_text_index >= 1;
              --translated_text_index)
        {
            translated_text = translated_text_array[ translated_text_index ];
            colon_character_index = translated_text.indexOf( ":" );

            if ( colon_character_index >= 0 )
            {
                if ( language_tag.MatchesLanguages( translated_text.substring( 0, colon_character_index ) ) )
                {
                    return translated_text.substring( colon_character_index + 1 );
                }
            }
        }
    }

    return translated_text_array[ 0 ];
}

// ~~

function GetTranslatedNumber(
    number,
    decimal_separator
    )
{
    if ( decimal_separator === "," )
    {
        return number.toString().replace( ".", "," );
    }
    else
    {
        return number.toString();
    }
}

// ~~

function GetLanguageDecimalSeparator(
    language_code
    )
{
    if ( language_code === "en"
         || language_code === "ja"
         || language_code === "ko"
         || language_code === "zh" )
    {
        return ".";
    }
    else
    {
        return ",";
    }
}

// ~~

String.prototype.GetTranslationArray = function (
    )
{
    var
        colon_character_index,
        translated_text,
        translated_text_array,
        translated_text_index,
        translation_array;

    translation_array = [];
    translated_text_array = this.split( "¨" );

    translation_array.push(
        {
            Specifier : "",
            Data : translated_text_array[ 0 ]
        }
        );

    for ( translated_text_index = 1;
          translated_text_index < translated_text_array.length;
          ++translated_text_index)
    {
        translated_text = translated_text_array[ translated_text_index ];
        colon_character_index = translated_text.indexOf( ":" );

        if ( colon_character_index >= 0 )
        {
            translation_array.push(
                {
                    Specifier : translated_text.substring( 0, colon_character_index ),
                    Data : translated_text.substring( colon_character_index + 1 )
                }
                );
        }
    }

    return translation_array;
}

// ~~

Array.prototype.GetMultilingualText = function (
    )
{
    var
        multilingual_text,
        translation,
        translation_index;

    multilingual_text = "";

    if ( this.length > 0 )
    {
        multilingual_text = this[ 0 ].Data;

        for ( translation_index = 1;
              translation_index < this.length;
              ++translation_index )
        {
            translation = this[ translation_index ];

            multilingual_text += "¨" + translation.Specifier + ":" + translation.Data;
        }
    }

    return multilingual_text;
}

// ~~

String.prototype.MatchesFilterExpression = function (
    filter_expression,
    or_operator = "|",
    and_operator = "&"
    )
{
    var
        and_filter,
        and_filter_array,
        matching_and_filter_count,
        or_filter,
        or_filter_array;

    or_filter_array = filter_expression.split( or_operator );

    for ( or_filter of or_filter_array )
    {
        matching_and_filter_count = 0;
        and_filter_array = or_filter.split( and_operator );

        for ( and_filter of and_filter_array )
        {
            if ( this.indexOf( and_filter ) >= 0 )
            {
                ++matching_and_filter_count;
            }
        }

        if ( matching_and_filter_count === and_filter_array.length )
        {
            return true;
        }
    }

    return false;
}

// ~~

String.prototype.GetSurroundingText = function (
    character_index,
    maximum_word_count,
    character_step
    )
{
    var
        character,
        surrounding_text,
        word_count;

    surrounding_text = '';
    word_count = 0;

    while ( character_index >= 0
            && character_index < this.length )
    {
        character = this.charAt( character_index );

        if ( character === ' ' )
        {
            ++word_count;

            if ( word_count >= maximum_word_count )
            {
                break;
            }
        }

        if ( character_step > 0 )
        {
            surrounding_text += character;
        }
        else
        {
            surrounding_text = character + surrounding_text;
        }

        character_index += character_step;
    }

    return surrounding_text;
}

// ~~

String.prototype.FindCharacterIndexes = function (
    searched_text
    )
{
    var
        searched_text_character_index,
        searched_text_character_index_array;

    searched_text_character_index_array = [];

    if ( searched_text !== "" )
    {
        let searched_text_character_index = this.indexOf( searched_text );

        while ( searched_text_character_index !== -1 )
        {
            searched_text_character_index_array.push( searched_text_character_index );
            searched_text_character_index = this.indexOf( searched_text, searched_text_character_index + searched_text.length );
        }
    }

    return searched_text_character_index_array;
}

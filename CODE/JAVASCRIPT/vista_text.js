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

String.prototype.GetTranslatedText = function (
    language_code,
    default_language_code = "en",
    translation_separator = "¨"
    )
{
    var
        translated_text,
        translated_text_array,
        translated_text_index;

    if ( this === "" )
    {
        return "";
    }
    else
    {
        translated_text_array = this.Split( translation_separator );

        if ( language_code !== default_language_code )
        {
            for ( translated_text_index = 1;
                  translated_text_index < translated_text_array.length;
                  ++translated_text_index )
            {
                translated_text = translated_text_array[ translated_text_index ];

                if ( translated_text.substring( 0, 2 ) === language_code )
                {
                    return translated_text.substring( 3 );
                }
            }
        }

        return translated_text_array[ 0 ];
    }
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

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
            if ( separator_characters_are_kept )
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
        prior_character_is_digit,
        prior_character_is_lower_case_letter,
        snake_case_text;

    snake_case_text = "";

    for ( character of this )
    {
        if ( character >= "0"
             && character <= "9" )
        {
            prior_character_is_digit = true;
        }
        else
        {
            lower_case_character = character.GetLowerCaseText();
            upper_case_character = character.GetUpperCaseText();

            if ( lower_case_character !== upper_case_character )
            {
                if ( character === lower_case_character )
                {
                    prior_character_is_lower_case_letter = true;
                }
                else if ( character === upper_case_character )
                {
                    if ( prior_character_is_lower_case_letter
                         || prior_character_is_digit )
                    {
                        snake_case_text += separator_character;
                    }

                    prior_character_is_lower_case_letter = false;
                }

                character = lower_case_character;
            }
            else
            {
                character = "";
                prior_character_is_lower_case_letter = true;
            }

            prior_character_is_digit = false;
        }

        snake_case_text += character;
    }

    return snake_case_text;
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
        translated_text_array = this.split( translation_separator );

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

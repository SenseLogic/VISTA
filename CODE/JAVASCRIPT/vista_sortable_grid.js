// -- FUNCTIONS

function HandleSortableGridColumnClickEvent(
    event
    )
{
    var
        cell_element_array,
        cell_element_index,
        column_element,
        column_element_array,
        column_element_count,
        footer_element,
        footer_element_array,
        grid_element,
        order_is_descending,
        cell_element_array_array,
        cell_element_array_index,
        sorted_cell_element,
        sorted_column_element,
        sorted_column_element_index,
        sorted_cell_element_array_array,
        sorted_cell_element_array;

    function GetCellValue(
        cell_element_array,
        cell_element_index
        )
    {
        return cell_element_array[ cell_element_index ].GetTextContent();
    }

    function GetCellComparison(
        cell_element_index,
        order_is_descending
        )
    {
        return (
            function (
                first_cell_element_array,
                second_cell_element_array
                )
            {
                var
                    cell_element_comparison,
                    first_cell_element_value,
                    second_cell_element_value;

                cell_element_comparison = 0;
                first_cell_element_value = GetCellValue( first_cell_element_array, cell_element_index ).trim();
                second_cell_element_value = GetCellValue( second_cell_element_array, cell_element_index ).trim();

                if ( IsNumeric( first_cell_element_value )
                     && IsNumeric( second_cell_element_value ) )
                {
                    cell_element_comparison = first_cell_element_value - second_cell_element_value;
                }
                else if ( first_cell_element_value < second_cell_element_value )
                {
                    cell_element_comparison = -1;
                }
                else if ( first_cell_element_value > second_cell_element_value )
                {
                    cell_element_comparison = 1;
                }

                if ( order_is_descending )
                {
                    cell_element_comparison = -cell_element_comparison;
                }

                return cell_element_comparison;
            }
            );
    }

    sorted_column_element = event.currentTarget;

    if ( sorted_column_element.HasClass( "order-is-ascending" ) )
    {
        sorted_column_element.OrderIsDescending = true;
    }
    else if ( sorted_column_element.HasClass( "order-is-descending" ) )
    {
        sorted_column_element.OrderIsDescending = false;
    }

    sorted_column_element_index = sorted_column_element.GetChildElementIndex();
    order_is_descending = sorted_column_element.OrderIsDescending;
    grid_element = sorted_column_element.GetParentElement( ".sortable-grid" );
    column_element_array = grid_element.GetChildElements( ".sortable-grid-column" );
    column_element_count = column_element_array.length;
    cell_element_array = grid_element.GetDescendantElements( ".sortable-grid-cell" );
    footer_element_array = grid_element.GetDescendantElements( ".sortable-grid-footer" );

    for ( column_element of column_element_array )
    {
        column_element
            .RemoveClass( "order-is-ascending" )
            .RemoveClass( "order-is-descending" );

        if ( column_element === sorted_column_element )
        {
            if ( order_is_descending )
            {
                column_element.AddClass( "order-is-descending" );
            }
            else
            {
                column_element.AddClass( "order-is-ascending" );
            }
        }
    }

    cell_element_array_array = [];
    cell_element_array_index = 0;

    for ( cell_element_index = 0;
          cell_element_index < cell_element_array.length;
          ++cell_element_index )
    {
        if ( cell_element_index % column_element_count === 0 )
        {
            cell_element_array_index = cell_element_index / column_element_count;
            cell_element_array_array[ cell_element_array_index ] = [];
        }

        cell_element_array_array[ cell_element_array_index ].AddLastValue( cell_element_array[ cell_element_index ] );
    }

    sorted_cell_element_array_array = cell_element_array_array.Sort( GetCellComparison( sorted_column_element_index, order_is_descending ) );

    for ( sorted_cell_element_array of sorted_cell_element_array_array )
    {
        for ( sorted_cell_element of sorted_cell_element_array )
        {
            grid_element.AppendChildElement( sorted_cell_element );
        }
    }

    for ( footer_element of footer_element_array )
    {
        grid_element.AppendChildElement( footer_element );
    }
}

// ~~

function InitializeSortableGridColumns(
    )
{
    var
        column_element;

    for ( column_element of GetElements( ".sortable-grid-column" ) )
    {
        column_element.OrderIsDescending = column_element.HasClass( "order-is-descending" );
        column_element.AddEventListener( "click", HandleSortableGridColumnClickEvent );
    }
}

// ~~

function FinalizeSortableGridColumns(
    )
{
    GetElements( ".sortable-grid-column" ).RemoveEventListener( "click", HandleSortableGridColumnClickEvent );
}

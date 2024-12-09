// -- FUNCTIONS

function HandleSortableTableColumnClickEvent(
    event
    )
{
    var
        column_element,
        column_element_array,
        order_is_descending,
        sorted_column_element,
        sorted_column_element_index,
        sorted_row_element,
        sorted_row_element_array,
        row_element_array,
        table_element;

    function GetCellValue(
        row_element,
        cell_element_index
        )
    {
        return row_element.GetChildElements( ".sortable-table-cell" )[ cell_element_index ].GetTextContent();
    }

    function GetCellComparison(
        cell_element_index,
        order_is_descending
        )
    {
        return (
            function(
                first_row_element,
                second_row_element
                )
            {
                var
                    cell_element_comparison,
                    first_cell_element_value,
                    second_cell_element_value;

                cell_element_comparison = 0;
                first_cell_element_value = GetCellValue( first_row_element, cell_element_index ).trim();
                second_cell_element_value = GetCellValue( second_row_element, cell_element_index ).trim();

                if ( IsNumericText( first_cell_element_value )
                     && IsNumericText( second_cell_element_value ) )
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
    table_element = sorted_column_element.GetAncestorElement( ".sortable-table" );
    column_element_array = table_element.GetDescendantElements( ".sortable-table-column" );

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

    row_element_array = table_element.GetDescendantElements( ".sortable-table-row:not(:first-child)" );
    sorted_row_element_array = row_element_array.Sort( GetCellComparison( sorted_column_element_index, order_is_descending ) );

    for ( sorted_row_element of sorted_row_element_array )
    {
        table_element.AppendChildElement( sorted_row_element );
    }
}

// ~~

function InitializeSortableTableColumns(
    root_element = undefined,
    element_selector = ".sortable-table-column"
    )
{
    var
        column_element;

    for ( column_element of GetRootElement( root_element ).GetElements( element_selector ) )
    {
        column_element.OrderIsDescending = column_element.HasClass( "order-is-descending" );
        column_element.AddEventListener( "click", HandleSortableTableColumnClickEvent );
    }
}

// ~~

function FinalizeSortableTableColumns(
    root_element = undefined,
    element_selector = ".sortable-table-column"
    )
{
    GetRootElement( root_element ).GetElements( element_selector ).RemoveEventListener( "click", HandleSortableTableColumnClickEvent );
}

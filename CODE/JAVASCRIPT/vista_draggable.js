// -- FUNCTIONS

function HandleDraggableItemDragStartEvent(
    event
    )
{
    var
        element_index;

    element_index = event.currentTarget.GetChildElementIndex();
    event.dataTransfer.setData( "text/plain", event.currentTarget.parentElement.id + ":" + element_index );
}

// ~~

function HandleDraggableItemDropEvent(
    event
    )
{
    var
        dropped_element,
        new_element_index,
        old_element_index,
        parent_element,
        target_element,
        transfer_data_array;

    CancelEvent( event );

    transfer_data_array = event.dataTransfer.getData( "text/plain" ).split( ":" );

    if ( transfer_data_array.length === 2 )
    {
        parent_element = GetElementById( transfer_data_array[ 0 ] );
        old_element_index = GetInteger( transfer_data_array[ 1 ] );

        target_element = event.currentTarget;
        new_element_index = target_element.GetChildElementIndex();

        if ( new_element_index != old_element_index
             && target_element.parentElement === parent_element )
        {
            dropped_element = parent_element.GetChildElementAtIndex( old_element_index );

            if ( new_element_index < old_element_index )
            {
                target_element.InsertPriorElement( dropped_element )
            }
            else
            {
                target_element.InsertNextElement( dropped_element );
            }
        }
    }
}

// ~~

function InitializeDraggableItems(
    element_selector = ".draggable-item",
    root_element = undefined
    )
{
    for ( item_element of GetRootElement( root_element ).GetElements( element_selector ) )
    {
        item_element.setAttribute( "draggable", true );
        item_element.addEventListener( "dragstart", HandleDraggableItemDragStartEvent )
        item_element.addEventListener( "drop", HandleDraggableItemDropEvent )
        item_element.addEventListener( "dragenter", CancelEvent )
        item_element.addEventListener( "dragover", CancelEvent )
    }
}

// ~~

function FinalizeDraggableItems(
    element_selector = ".draggable-item",
    root_element = undefined
    )
{
    for ( item_element of GetRootElement( root_element ).GetElements( element_selector ) )
    {
        item_element.setAttribute( "draggable", false );
        item_element.removeEventListener( "dragstart", HandleDraggableItemDragStartEvent )
        item_element.removeEventListener( "drop", HandleDraggableItemDropEvent )
        item_element.removeEventListener( "dragenter", CancelEvent )
        item_element.removeEventListener( "dragover", CancelEvent )
    }
}

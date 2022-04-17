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
    )
{
    for ( draggable_element of GetElements( ".draggable-item" ) )
    {
        draggable_element.setAttribute( "draggable", true );
        draggable_element.addEventListener( "dragstart", HandleDraggableItemDragStartEvent )
        draggable_element.addEventListener( "drop", HandleDraggableItemDropEvent )
        draggable_element.addEventListener( "dragenter", CancelEvent )
        draggable_element.addEventListener( "dragover", CancelEvent )
    }
}

// ~~

function FinalizeDraggableItems(
    )
{
    for ( draggable_element of GetElements( ".draggable-item" ) )
    {
        draggable_element.setAttribute( "draggable", false );
        draggable_element.removeEventListener( "dragstart", HandleDraggableItemDragStartEvent )
        draggable_element.removeEventListener( "drop", HandleDraggableItemDropEvent )
        draggable_element.removeEventListener( "dragenter", CancelEvent )
        draggable_element.removeEventListener( "dragover", CancelEvent )
    }
}

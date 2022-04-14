import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarStyle.scss';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  return (
    <DragAndDropCalendar
      className='calendar'
      localizer={localizer}
      defaultView="week"
      events={props.myEvents}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event) => {
        props.changeTitle(event);
      }}
      min={new Date(moment().hour(6).minute(0))}
      max={new Date(moment().hour(23).minute(0))}
      onEventDrop={props.moveEvent}
      onEventResize={props.resizeEvent}
      onDropFromOutside={props.onDropFromOutside}
      style={{ height: 1000 }}
    />
  )
}

export default MyCalendar;
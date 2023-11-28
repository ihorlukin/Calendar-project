import {useEffect, useState} from 'react';
import moment from "moment";
import {Title} from "../Title/Title";
import {Monitor} from "../Monitor/Monitor";
import {CalendarGrid} from "../CalendarGrid/CalendarGrid";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../../helpers/constants";
import {DayShowComponent} from "../DayShowComponent/DayShowComponent";
import { CreateEventForm } from '../CreateEventForm/CreateEventForm';
import { ShadowWrapper } from '../../containers/StyledComponents';
import { LoginForm } from '../LoginForm/LoginForm';



const url = "http://localhost:3001";
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  duration: 1,
  date: moment().format('X')
}
function App() {
  const user = true
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  //work with date
  moment.updateLocale('en', {week: {dow: 1}});
  const [today, setToday] = useState(moment())
  const startDay = today.clone().startOf('month').startOf('week');
  const [isShowModal, SetIsShowModal] = useState(false)

  // months clickers
  const prevHandler = () => setToday(prev => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment())
  const nextHandler = () => setToday(prev => prev.clone().add(1, displayMode));

  const [method, setMethod] = useState(null)
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);
  
  const [events, setEvents] = useState([]);
  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(totalDays,'days').format('X');
  
  // useEffect(() => {
  //   fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
  //     .then(res => res.json())
  //     .then(res => setEvents(res));
  // }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')}); // todo
    setMethod(methodName);
  }

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    if(!user) return;
    console.log('onDoubleClick',methodName);
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
  }

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  }
  
  
  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  
  const fetchHandler = (fetchUrl, eventForUpdate, httpMethod) => {

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventForUpdate)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(httpMethod === 'PATCH') {
          setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
        } else {
          setEvents(prevState => [...prevState, res]);
        }
        cancelButtonHandler()
      }).catch(e => console.log(e))
  }

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetchHandler(fetchUrl, event, httpMethod);
  }

  const updateEventByDragAndDrop = (droppedEvent) => {
    const fetchUrl = `${url}/events/${droppedEvent.id}`;
    console.log({droppedEvent})
    fetchHandler(fetchUrl, droppedEvent, 'PATCH');
  }

  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
        cancelButtonHandler()
      })
  }

  return (
    <>
       {
        isShowForm ?
          <CreateEventForm
            cancelButtonHandler={cancelButtonHandler}
            event={event}
            changeEventHandler={changeEventHandler}
            eventFetchHandler={eventFetchHandler}
            method={method}
            removeEventHandler={removeEventHandler}
          /> : null
      }
      {
        isShowModal &&
        <LoginForm
          SetIsShowModal={SetIsShowModal}
        />
      }
      <ShadowWrapper>
        <Title SetIsShowModal={SetIsShowModal}/>
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        {
          displayMode === DISPLAY_MODE_MONTH ? (
            <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode} />
          ) : null
        }
        {
          displayMode === DISPLAY_MODE_DAY ? (
            <DayShowComponent
              events={events}
              today={today}
              selectedEvent={event}
              setEvent={setEvent}
              changeEventHandler={changeEventHandler}
              cancelButtonHandler={cancelButtonHandler}
              eventFetchHandler={eventFetchHandler}
              method={method}
              removeEventHandler={removeEventHandler}
              openFormHandler={openFormHandler}
              updateEventByDragAndDrop={updateEventByDragAndDrop}
            />
          ) : null
        }
      </ShadowWrapper>
    </>
  );
}

export default App;

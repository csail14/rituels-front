import WeekView from 'react-native-week-view';
import * as React from 'react';

const myEvents = [
    {
        id: 1,
        description: 'Event',
        startDate: new Date("2021-02-12T10:00:00.000Z"),
        endDate: new Date("2021-02-12T12:00:00.000Z"),
        color: 'blue'
      }
];

const MyComponent = () => (
  <WeekView
    events={myEvents}
    selectedDate={new Date()}
    numberOfDays={7}
    headerStyle ={{backgroundColor: '#4286f4', color: '#fff', borderColor: '#fff' }}
  />
);

const Test = ()=> {

    return (
        <MyComponent/>
    )
}

export default Test
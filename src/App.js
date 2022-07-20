import "./App.scss";
import Header from "./components/Header/Header.js";
import Home from "./Home.js";
import {useState} from "react";

/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Component declaration
  • Event handlers
  • Private functions
  • Init & Export
*/

/*
  • Component declaration
  ---------- ---------- ---------- ---------- ----------
*/

const lastTimesheet = [
    {id: 1, date: "04/07/2022", project: "CosaVostra Interne", task: "Weekly Dev", duration: "00:30"},
    {id: 3, date: "04/07/2022", project: "Timetime", task: "Intégration maquette timesheet workflow", duration: "07:00"},
    {id: 3, date: "01/07/2022", project: "Emma", task: "Intégration maquette emma avec questionnaire", duration: "04:30"},
]

function App() {
    const [state, setState] = useState({
        userId: 1,
        days: getLastDays(),
        activeDay: getToday(),
        lastEntries: [...lastTimesheet],
        progressRef: 450,
    })
    const {days, activeDay, lastEntries, progressRef} = state;
    const [timeSheetTime, setTimeSheetTime] = useState("00");

    function handleDayClick(e, day) {
        e.preventDefault();
        setState({...state,activeDay: day.date});
    }

    function handleFormSubmit(e, formData) {
        e.preventDefault();

        setTimeSheetTime(formData.duration.hours);

        addTimeSheet({
            id: lastEntries.length + 1,
            date: formData.activeDate,
            project: formData.project,
            task: formData.task,
            duration: `${formData.duration.hours}:${formData.duration.min}`
        });

    }

    function addTimeSheet(timeSheet) {
        setState({...state, lastEntries: [timeSheet, ...state.lastEntries]})
    }

    getProjects();

    return (
        <main className="App">
            <Header/>
            <Home
                progressBase={progressRef}
                onFormSubmit={handleFormSubmit}
                onDayClick={handleDayClick}
                activeDay={activeDay}
                days={days}
                lastTimeSheets={lastEntries}
                timeSheetTime={timeSheetTime}
                today={getToday()}
            />
        </main>
    );
}

/*
  • Event handlers
  ---------- ---------- ---------- ---------- ----------
*/


/*
  • Private functions
  ---------- ---------- ---------- ---------- ----------
*/

// get last 7 days from today
function getLastDays() {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const today = new Date();
        today.setDate(today.getDate() - i);
        const [dayName, dayMonth, dayDate, dayYear] = [today.toDateString().split(' ')[0], today.getMonth() + 1, today.getDate(), today.getFullYear()];
        days.push({
            name: getFrenchDayName(dayName),
            date: getTwoDigitFormatDate(dayDate, dayMonth, dayYear),
            progress: [0, 70, 100][Math.floor(Math.random() * 3)] // random progress between 0, 70 and 100(dev purpose)
        })
    }
    return days;
}

function getFrenchDayName(dayName) {
    const translations = {
        "Mon": "Lun",
        "Tue": "Mar",
        "Wed": "Mer",
        "Thu": "Jeu",
        "Fri": "Ven",
        "Sat": "Sam",
        "Sun": "Dim"
    };
    return translations[dayName];
}

function getTwoDigitFormatDate(date, month, year) {
    return `${date.toString().length > 1 ? date : "0" + date}/${month.length > 1 ? month : "0" + month}/${year}`
}

function getToday() {
    const today = new Date();
    const [dayMonth, dayDate, dayYear] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
    return getTwoDigitFormatDate(dayDate, dayMonth, dayYear);
}

async function getProjects() {
    const myHeaders = new Headers();
    myHeaders.append("accessKey", process.env.REACT_APP_API_KEY);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'no-cors',
    };

    const data = await fetch(`${process.env.REACT_APP_API_URL}/projects`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

    console.log(data);
    return data;
}

/*
  • Init & Export
  ---------- ---------- ---------- ---------- ----------
*/

export default App;

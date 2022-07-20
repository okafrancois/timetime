import './styles/Home.scss';
import TimesheetForm from "./components/TimesheetForm/TimesheetForm.js";
import DayCard from "./components/DayCard/DayCard.js";
import CardList from "./components/CardList/CardList.js";

function Home(props) {
    const {days, activeDay, today, lastTimeSheets, timeSheetTime, onDayClick, onFormSubmit, progressBase}  = props;

    return (
        <div className="home">
            <section className={"slides"}>
                <h2>Vous avez timesheeté <span className={"duration-value"}>{timeSheetTime}h</span> {today === activeDay ? "aujourd'hui" : `le ${activeDay}`}</h2>
                <div className="card-slider">
                    <div className="card-slider__wrapper">
                        {days.map((day, id) =>
                            <DayCard
                                onDayClick={(e) => onDayClick(e, day)} key={id}
                                name={day.name}
                                number={day.date.split('/')[0]}
                                progress={day.progress}
                                progressBase={progressBase}
                                classes={day.date.split('/')[0] === activeDay.split('/')[0] ? "--active" : ""}/>)}
                    </div>
                </div>
            </section>
            <section className={"timesheet container"}>
                <TimesheetForm lastTimeSheets={lastTimeSheets} submitHandler={onFormSubmit} currentDate={activeDay}/>
            </section>
            <section className={"container"}>
                <h2>Dernières entrées</h2>
                <CardList items={lastTimeSheets}/>
            </section>
        </div>
    )
}

export default Home

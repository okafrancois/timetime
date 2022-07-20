import './DayCard.scss';

const DayCard = ({name, number, classes, progress, progressBase, onDayClick}) => {
    const fillState = () => {
        if (progress === 100) {
            return "--valid";
        } else if (progress > 0 && progress < progressBase) {
            return "--warning";
        } else {
            return "--danger";
        }
    }
    return (
        <div className={"day-card " + classes}>
            <button className="day-card__container" onClick={onDayClick}>
                <div className={`day-card__progress ${fillState()}`}></div>
                <div className="day-card__name">{name}</div>
                <div className="day-card__date">{number}</div>
            </button>
        </div>
    )
}

export default DayCard;

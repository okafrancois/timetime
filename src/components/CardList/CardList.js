import './CardList.scss';
import clockIcon from '../../assets/clock.svg';

const CardList = (props) => (
    <div className="card-list">
        <div className="card-list__wrapper">
            {props.items.map((item, id) => (
                <div key={id} className={"card-list__item card"}>
                    <div className={"card__title"}>
                        <p>{item.project}</p>
                    </div>
                    <div className="card__description">
                        <span className={"card__icon"}>
                            <img src={clockIcon} alt="icon"/>
                        </span>
                        <span>{item.duration}</span> -
                        <span>{item.date}</span>
                    </div>
                    <div className="card__details">
                        <p>{item.task}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)


export default CardList;

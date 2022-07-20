import './custom-select.scss'
import {useState} from "react";

/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Config
  • Event handlers
  • Init & Export
*/

/*
 • Config
 ---------- ---------- ---------- ---------- ----------
 */

const CustomSelect = ({items, inputPlaceholder, autoComplete, suggestions, onOptionSelect, onSuggestionClick, activeOption}) => {
    const currentValue = activeOption === "" ? inputPlaceholder : activeOption;
    const [inputValue, setInputValue] = useState(currentValue);
    const [openState, setOpenState] = useState(false);
    const [suggestionsState, setSuggestionsState] = useState(suggestions);

    function open(e) {
        e.preventDefault()
        setOpenState(true);
        document.addEventListener('click', handleOutsideClick)
    }

    function close() {
        setOpenState(false)
        document.removeEventListener('click', handleOutsideClick)
    }

    function handleOutsideClick(e){
        if(!e.target.closest('.custom-select')){
            close();
        }
    }

    function hideSuggestions() {
        setSuggestionsState(false)
    }

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    return (
        <div className={`custom-select ${openState ? '--is-open' : ''}`}>
            <label className={"custom-select__label"}>
                <input onClick={open} className={"custom-select__value button custom-select__input"} value={`${inputValue}`} onChange={handleChange}/>
            </label>
            <div className={"custom-select__list"}>
                {autoComplete && items && openState && inputValue.length > 1  && items.map((item, index) => {
                        return (
                        <button key={index}
                                className={`custom-select__item ${item.toLowerCase().includes(inputValue.toLowerCase()) ? '' : '--is-disabled'}`}
                                onClick={onOptionSelect}>
                            {item}
                        </button>
                    )
                })
                }

                {!autoComplete && items && openState && items.map((item, index) => (
                    <button key={index}
                            className={`custom-select__item`}
                            onClick={(e) => {
                                onOptionSelect(e);
                                setInputValue(item);
                                close();
                            }}>
                        {item}
                    </button>
                ))}
            </div>

            { suggestions && items &&
                <div className={`custom-select__suggestions ${suggestionsState ? "" : "--is-disabled"}`}>
                    {items.map((item, index) => (
                        <button key={index}
                                onClick={e => {
                                    onSuggestionClick(e);
                                    setInputValue(item);
                                    hideSuggestions();
                                }}>
                            {item}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}

/*
 • Init & export
 ---------- ---------- ---------- ---------- ----------
 */




export default CustomSelect;

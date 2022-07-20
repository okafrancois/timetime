import "./TimesheetForm.scss"
import {useState} from "react";
import CustomSelect from "../CustomSelect/CustomSelect.js";
import SelectBox from "../SelectBox/SelectBox.js";

/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Component declaration
  • Init & Export
*/

/*
  • Component declaration
  ---------- ---------- ---------- ---------- ----------
*/

const TimesheetForm = ({lastTimeSheets, submitHandler, currentDate}) => {
    const [project, setProject] = useState("");
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState({hours: "00", min: "00"});
    const activeDate = currentDate;

    const projectsList = [...new Set(lastTimeSheets.map(timesheet => timesheet.project))];

    function getLastTimesheet(projectName) {
        return lastTimeSheets.filter(timesheet => timesheet.project === projectName)[0];
    }

    function handleSuggestionClick(e) {
        e.preventDefault();
        autoCompleteInputs(e.target.innerText);
    }

    function handleProjectChange(e) {
        e.preventDefault();

        autoCompleteInputs(e.target.innerText);
    }

    function autoCompleteInputs(projectName) {
        const projectTimesheet = getLastTimesheet(projectName);

        setProject(projectTimesheet.project);

        setTask(projectTimesheet.task);

        setDuration({
            hours: projectTimesheet.duration.split(":")[0],
            min: projectTimesheet.duration.split(":")[1]
        });
    }

    function handleTaskChange(e) {
        setTask(e.target.value);
    }

    function handleHourChange(e) {
        e.preventDefault();

        setDuration({...duration, hours: e.target.value});
    }

    function handleMinuteChange(e) {
        e.preventDefault();

        setDuration({...duration, min: e.target.value});
    }

    return(
        <form className={"timesheet-form"} onSubmit={(e) => {submitHandler(e, {activeDate, project, task, duration})}}>
            <div>
                <h2>Projet</h2>
                <CustomSelect
                    suggestions={true}
                    inputName={"project"}
                    inputPlaceholder={"Sélectionner un projet"}
                    onOptionSelect={handleProjectChange}
                    activeOption={project}
                    items={projectsList}
                    onSuggestionClick={handleSuggestionClick}
                    autoComplete={true}
                />
            </div>
            <div>
                <h2>Tâche(s) réalisée(s)</h2>
                <label>
                    <textarea
                        onChange={handleTaskChange}
                        value={task}
                        placeholder={"Tache(s) réalisée(s)"}
                        name={"task"}
                        className={"input full-width"}/>
                </label>
            </div>
            <div className={"form-field duration-input"}>
                <h2>Durée</h2>
                <SelectBox
                    options={["00", "01", "02", "03", "04", "05", "06", "07"]}
                    baseValue={duration.hours}
                    label={"Hrs"}
                    onChange={handleHourChange}/>
                <SelectBox
                    options={["00", "15", "30", "45"]}
                    baseValue={duration.min}
                    label={"Mins"}
                    onChange={handleMinuteChange}/>
            </div>

            <div className="footer">
                <button className={"button --primary full-width"}>Timesheeter</button>
            </div>
        </form>
    )
}

/*
  • Init & Export
  ---------- ---------- ---------- ---------- ----------
*/

export default TimesheetForm

import { EntryFormValues } from "../../types";
import { useState, SyntheticEvent } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosiscodes, setDiagnosisCodes] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [entryType, setEntryType] = useState("HealthCheck");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const rating = Number(healthCheckRating);

        if (
            healthCheckRating === "" ||
            (rating !== 0 && rating !== 1 && rating !== 2 && rating !== 3)
        ) {
            return;
        }

        onSubmit({
            type: "HealthCheck",
            date,
            description,
            specialist,
            healthCheckRating: rating,
            diagnosisCodes: diagnosiscodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        });
    };

    const addoccupationalhealth = (event: SyntheticEvent) => {
        event.preventDefault();

        onSubmit({
            type: "OccupationalHealthcare",
            date,
            description,
            specialist,
            employerName,
            sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
            },
            diagnosisCodes: diagnosiscodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        });
    };

    const addhospital = (event: SyntheticEvent) => {
        event.preventDefault();
    
        onSubmit({
            type: "Hospital",
            date,
            specialist,
            description,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria,
            },
            diagnosisCodes: diagnosiscodes
            .split(",")
            .map((code) => code.trim())
            .filter(Boolean),
        });
    };

    return (
        <div>
            <form onSubmit={entryType === "HealthCheck" ? addEntry : entryType === "OccupationalHealthcare" ? addoccupationalhealth : addhospital}>
                <label htmlFor="entryType">Entry type: </label>
                <select
                    id="entryType"
                    value={entryType}
                    onChange={(event) => setEntryType(event.target.value)}>
                    <option value="HealthCheck">Health check</option>
                    <option value="Hospital">Hospital</option>
                    <option value="OccupationalHealthcare">Occupational healthcare</option>
                </select>
                <div>
                    <label htmlFor="date">Date: </label>
                    <input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
                </div>
                <div>
                    <label htmlFor="specialist">Specialist: </label>
                    <input id="specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} required />
                </div>
                {entryType === "HealthCheck" && (
                <div>
                    <label htmlFor="healthCheckRating">Health check rating: </label>
                    <select id="healthCheckRating" value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)} required>
                        <option value="">Select a rating</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>)}
                {entryType === "OccupationalHealthcare" && (
                <div style={{ display: entryType === "OccupationalHealthcare" ? "block" : "none" }}>
                    <label htmlFor="employerName">Employer name: </label>
                    <input id="employerName" value={employerName} onChange={(event) => setEmployerName(event.target.value)} />
                </div>)}
                {entryType === "OccupationalHealthcare" && (
                <div style={{ display: entryType === "OccupationalHealthcare" ? "block" : "none" }}>
                    <label htmlFor="sickLeaveStartDate">Sick leave start date: </label>
                    <input id="sickLeave" type="date" value={sickLeaveStartDate} onChange={(event) => setSickLeaveStartDate(event.target.value)} required />
                    <label htmlFor="sickLeaveEndDate">Sick leave end date: </label>
                    <input id="sickLeave" type="date" value={sickLeaveEndDate} onChange={(event) => setSickLeaveEndDate(event.target.value)} required />
                </div>)}
                {entryType === "Hospital" && (
                <div style={{ display: entryType === "Hospital" ? "block" : "none" }}>
                    <label htmlFor="discharge">Discharge: </label>
                    
                    <input id="discharge" type="date" value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} required />
                    <input id="discharge" placeholder="Discharge reason:" value={dischargeCriteria} onChange={(event) => setDischargeCriteria(event.target.value)} required />
                </div>)}
                <div>
                    <label htmlFor="diagnosisCodes">Diagnosis codes (comma-separated): </label>
                    <input id="diagnosisCodes" value={diagnosiscodes} onChange={(event) => setDiagnosisCodes(event.target.value)} />
                </div>
                <button type="submit">Add entry</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );

};

export default AddEntryForm;
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
    return (
        <div>
            <form onSubmit={addEntry}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
                </div>
                <div>
                    <label htmlFor="specialist">Specialist</label>
                    <input id="specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} required />
                </div>
                <div>
                    <label htmlFor="healthCheckRating">Health check rating</label>
                    <select id="healthCheckRating" value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)} required>
                        <option value="">Select a rating</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="diagnosisCodes">Diagnosis codes (comma-separated)</label>
                    <input id="diagnosisCodes" value={diagnosiscodes} onChange={(event) => setDiagnosisCodes(event.target.value)} />
                </div>
                <button type="submit">Add entry</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddEntryForm;
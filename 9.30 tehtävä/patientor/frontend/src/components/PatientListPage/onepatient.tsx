import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import { Diagnosis, Entry, EntryFormValues, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "../AddEntryModel/AddEntryForm";

const OnePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<
    { id: string; patient: Patient } | { id: string; error: string } | undefined
  >();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const diagnosisByCode = new Map(
    diagnoses.map((diagnosis) => [diagnosis.code, diagnosis.name])
  );

  const [entryError, setEntryError] = useState<string>();

  const addEntry = async (patientId: string, entry: EntryFormValues) => {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      entry
    );
    return data;
  };

  useEffect(() => {
    axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then(({ data }) => setDiagnoses(data))
      .catch((error: unknown) => console.error("Failed to fetch diagnoses", error));
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    };

    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getById(id);
        setResult({ id, patient: fetchedPatient });
      } catch (e: unknown) {
        console.error("Failed to fetch patient", e);
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setResult({ id, error: "Patient not found" });
        } else {
          setResult({ id, error: "Failed to fetch patient" });
        }
      }
    };
  
    void fetchPatient();
  }, [id]);

  if (!id) {
    return <Alert severity="error">Patient ID is missing</Alert>;
  }

  if (!result || result.id !== id) {
    return <CircularProgress />;
  }

  if ("error" in result) {
    return <Alert severity="error">{result.error}</Alert>;
  }

  const patient = result.patient;
  const GenderIcon = patient.gender === Gender.Male
    ? Male
    : patient.gender === Gender.Female
      ? Female
      : Transgender;

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {patient.name} <GenderIcon aria-label={patient.gender} />
      </Typography>
      <Typography> date of birth: {patient.dateOfBirth}</Typography>
      <Typography> ssn: {patient.ssn}</Typography>
      <Typography> occupation: {patient.occupation}</Typography>
      <Typography variant="h5" component="h1">
        entries
      </Typography>
      {patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <Box key={entry.id} sx={{ border: 1, borderRadius: 1, p: 2, mb: 2 }}>
            <Typography>
              {entry.date}
              {entry.type === "OccupationalHealthcare" &&
              entry.description === "Prescriptions renewed."
                ? <WorkIcon />
                : <MedicalServicesIcon />}
              {entry.type === "OccupationalHealthcare" ? entry.employerName : ""}
            </Typography>
            <Typography>Description: {entry.description}</Typography>
            {entry.type === "HealthCheck" && (
              <FavoriteIcon
                sx={{
                  color:
                    entry.healthCheckRating === 0
                      ? "green"
                      : entry.healthCheckRating <= 2
                        ?"gold"
                        : "red",}}/>
            )}
            {entry.diagnosisCodes?.length ? (
              entry.diagnosisCodes.map((code) => (
                <Typography key={code}>
                  {code}: {diagnosisByCode.get(code) ?? "Unknown diagnosis"} : {entry.specialist}
                </Typography>
              ))
            ) : (
              <Typography>diagnosed by {entry.specialist}</Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography>No entries</Typography>
      )}

      <Box sx={{ border: 1, borderRadius: 1, p: 2, mb: 2 }}>
        <Typography variant="h5" component="h1">
          New HealthCheck Entry
        </Typography>
        {entryError && <Alert severity="error">{entryError}</Alert>}
        <AddEntryForm onSubmit={async (entry) => {
          setEntryError(undefined);

          try {
            await addEntry(patient.id, entry);
            const updatedPatient = await patientService.getById(patient.id);
            setResult({ id: patient.id, patient: updatedPatient });
          } catch (error: unknown) {
            if (axios.isAxiosError<{ error?: string }>(error)) {
              setEntryError(error.response?.data?.error ?? "Failed to add entry");
            } else {
              setEntryError("Failed to add entry");
            }
          }
        }}onCancel={function (): void {
        }}  />
      </Box>
    </Box>
  );
};

export default OnePatient;

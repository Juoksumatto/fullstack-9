import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";

const OnePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<
    { id: string; patient: Patient } | { id: string; error: string } | undefined
  >();

  useEffect(() => {
    if (!id) {
      return;
    }

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
    </Box>
  );
};

export default OnePatient;

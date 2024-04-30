import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "./types";
import { devtools, persist } from "zustand/middleware";

// Define el tipo de estado
type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (id: Patient["id"], data: DraftPatient) => void;
};

// Crear un paciente
const createPatient = (patient: DraftPatient) => {
  return { ...patient, id: uuidv4() };
};

// Define the store
export const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({
    patients: [],
    activeId: "",
    addPatient: (data) => {
      const newPatient = createPatient(data);
      set((state) => ({
        patients: [...state.patients, newPatient],
      }));
    },
    deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    },
    getPatientById: (id) => {
      set(() => ({
        activeId: id,
      }));      
    },
    updatePatient: (id, data) => {
      set((state) => ({
        patients: state.patients.map((patient) =>
          patient.id === id ? { ...patient, ...data } : patient
        ), activeId: "",
      }));
    },
  }), {
    name: "patient-storage"    
  })
));

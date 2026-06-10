export interface ApplicationFormData {
  name: string;
  email: string;
  linkedin: string;
  fullTime: string;
  coFounder: string;
  description: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

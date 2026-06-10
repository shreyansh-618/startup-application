export interface ApplicationFormData {
  name: string;
  email: string;
  linkedin: string;
  fullTime: string;
  coFounder: string;
  description: string;
}

export interface GoogleScriptPayload {
  name: string;
  email: string;
  linkedin: string;
  fullTime: string;
  team: string;
  startup: string;
  _gotcha: number;
}

export interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

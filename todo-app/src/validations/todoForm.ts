import { Rule } from "antd/es/form";

export enum EstatusTodo {
  POR_HACER = "Por Hacer",
  EN_PROGRESO = "En Progreso",
  FINALIZADA = "Finalizada",
}

export const generateBasicInputRules = (
    maxLength: number,
    required: boolean
  ): Rule[] => {
    return [
      {
        required,
        message: "Campo requerido.",
      },
      {
        pattern: /^(?!\s)(.*\S)?$/,
        message: "No use espacios al inicio o final.",
      },
      {
        validator: (_, value: string) => {
          if (value && value.length > maxLength) {
            return Promise.reject(
              `Máximo ${maxLength} caracteres. Actual: ${value.length}.`
            );
          }
          return Promise.resolve();
        },
      },
    ];
};
import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-ZZáéíóúÁÉÍÓÚ]+) ([a-zA-ZáéíóúÁÉÍÓÚ]+)';
  public nombrePattern: string = '^[a-zA-ZáéíóúÁÉÍÓÚ]+( [a-zA-ZáéíóúÁÉÍÓÚ]+)?$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }
    return null;
  }
  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }
  public validateNoQuery(control: AbstractControl): ValidationErrors | null {
    if (!control || control.value === null || control.value === undefined) {
      return null; // Manejar el caso cuando el control sea nulo o indefinido
    }
    const value: string = control.value;
    const queryKeywords: string[] = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "TRUNCATE", "http", "https", "www",];

    for (const keyword of queryKeywords) {
      if (value.toUpperCase().includes(keyword)) {
        return { noQuery: true };
      }
    }

    return null;
  }
   validaSoloNumeros(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) {
      return null; // Manejar el caso cuando el valor sea nulo o vacío
    }
    // Verificar si el valor contiene caracteres que no sean números
    const containsNonNumeric = /\D/g.test(value);
    return containsNonNumeric ? { containsNonNumeric: true } : null;
  }
}
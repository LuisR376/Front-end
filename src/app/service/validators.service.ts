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
    public noNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value: string = control.value;

            // Verificar si el valor contiene números
            const containsNumbers = /\d/g.test(value);

            // Retornar un objeto de error si el valor contiene números
            return containsNumbers ? { containsNumbers: true } : null;
        };
    }
}
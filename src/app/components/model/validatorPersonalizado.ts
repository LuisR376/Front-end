import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;

      // Verificar si el valor contiene números
      const containsNumbers = /\d/g.test(value);

      // Retornar un objeto de error si el valor contiene números
      return containsNumbers ? { containsNumbers: true } : null;
    };
  }
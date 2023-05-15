export interface PreviousName {
    id: number;
    value: string;
}
export interface Street {
    name: string;
    length: number;
    history: string;
    district: string;
    previousNames: Array<PreviousName>;
}

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export function nameValidator(street: Street): ValidationResult {
    if (!street.name || street.name.length < 3 || street.name.length > 50) {
        return {
            isValid: false,
            message: "Назва вулиці має містити від 3 до 50 символів",
        };
    }
    return { isValid: true };
}

export function lengthValidator(street: Street): ValidationResult {
    if (isNaN(Number(street.length))) {
        return {
            isValid: false,
            message: "Довжина вулиці має бути числом",
        };
    }
    if (!street.length || street.length < 1 || street.length > 10000) {
        return {
            isValid: false,
            message: "Довжина вулиці має бути від 1 до 10000 метрів",
        };
    }

    return { isValid: true };
}

export function historyValidator(street: Street): ValidationResult {
    if (
        !street.history ||
        street.history.length < 10 ||
        street.history.length > 500
    ) {
        return {
            isValid: false,
            message: "Історія вулиці має містити від 10 до 500 символів",
        };
    }
    return { isValid: true };
}

export function districtValidator(street: Street): ValidationResult {
    if (
        !street.district ||
        street.district.length < 3 ||
        street.district.length > 30
    ) {
        return {
            isValid: false,
            message: "Назва району має містити від 3 до 30 символів",
        };
    }
    return { isValid: true };
}
export function previousNamesValidator(street: Street): ValidationResult {
    let valid = true;
    street.previousNames.forEach((element: PreviousName) => {
        if (
            !element.value ||
            element.value.length < 3 ||
            element.value.length > 50
        ) {
            valid = false;
            return;
        }
    });
    if (valid) {
        return { isValid: true };
    }
    return {
        isValid: false,
        message: "Минула назва вулиці має містити від 3 до 50 символів",
    };
}

export function getCrudErrors({ status, error }: any): string[] {
  if (!error || (status >= 500 && status <= 599)) {
    return ['Ocorreu um erro interno, por favor, tente novamente.'];
  }

  if (!Array.isArray(error.message)) {
    if (typeof error.message === 'string' && error.message.includes('Cannot'))
      return [
        'A rota especificada não foi encontrada, por favor, contate os administradores se o erro persistir.',
      ];

    return [
      error.message ||
      'Ocorreu um erro inesperado, por favor, contate os administradores se o erro persistir.',
    ];
  }

  if (error.message.every((message: any) => typeof message === 'string'))
    return error.message;

  return error.message
    .map(({ constraints }: any) =>
      constraints ? Object.values(constraints) || [] : [],
    )
    .reduce((acc: any, actual: any) => [...acc, ...actual] as string[]);
}

export async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') return;

      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

export function isValid<T>(value: T): value is NonNullable<T> {
  return !(value === null || value === undefined);
}

export function isDate(dateString: string) {
  return !isNaN(new Date(dateString).getDate());
}

export function enumValues(value: any): any[] {
  const isNumber = (i: any) => typeof i === 'number';

  const hasNumber = Object.values(value).some(isNumber);

  if (hasNumber) {
    return Object.values(value).filter(isNumber);
  }

  return Object.values(value);
}

export function normalizeWhitespaces(str: string): string {
  return str.replace(/ +(?= )/g, '');
}

declare module 'react-i18next' {
  export { useTranslation, initReactI18next } from 'react-i18next';

  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
  }
}

declare module 'i18next' {
  export { createInstance } from 'i18next';

  interface CustomTypeOptions {
    returnNull: false;
  }
}

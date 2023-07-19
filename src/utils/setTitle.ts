export default function setTitle(title?: string) {
    const { VITE_APP_TITLE } = import.meta.env;
    const processTitle = VITE_APP_TITLE || '';
    window.document.title = `${title ? `${title}  ` : ''} ${processTitle}`;
  }
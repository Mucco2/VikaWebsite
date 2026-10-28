// Frontend-validering med danske fejlbeskeder + indsendelse til Netlify Forms eller Formspree.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function customChecks(field: Field) {
  field.setCustomValidity('');

  if (field instanceof HTMLInputElement && field.type === 'file' && field.files?.length) {
    const file = field.files[0];
    const maxMb = Number(field.dataset.maxSizeMb || 0);
    const allowed = field.accept
      .split(',')
      .map((ext) => ext.trim().toLowerCase())
      .filter(Boolean);
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (allowed.length && !allowed.includes(ext)) {
      field.setCustomValidity(`Filtypen understøttes ikke. Brug ${allowed.join(', ')}.`);
    } else if (maxMb && file.size > maxMb * 1024 * 1024) {
      field.setCustomValidity(`Filen er for stor. Den må højst fylde ${maxMb} MB.`);
    }
  }

  if (field instanceof HTMLInputElement && field.dataset.after && field.value) {
    const other = document.getElementById(field.dataset.after) as HTMLInputElement | null;
    if (other?.value && field.value < other.value) {
      field.setCustomValidity('Slutdatoen skal ligge samme dag som eller efter startdatoen.');
    }
  }
}

function messageFor(field: Field): string {
  const v = field.validity;
  if (v.valid) return '';
  if (v.customError) return field.validationMessage;
  if (v.valueMissing) {
    if (field instanceof HTMLInputElement && field.type === 'checkbox') return 'Du skal sætte flueben for at fortsætte.';
    if (field instanceof HTMLInputElement && field.type === 'file') return 'Vælg en fil.';
    if (field instanceof HTMLSelectElement) return 'Vælg en mulighed på listen.';
    return 'Udfyld venligst feltet.';
  }
  if (v.typeMismatch && field.type === 'email') return 'Indtast en gyldig e-mailadresse, fx navn@domæne.dk.';
  if (v.patternMismatch) return field.dataset.patternMessage || 'Tjek venligst formatet.';
  if (v.rangeUnderflow) return 'Datoen kan ikke ligge før i dag.';
  if (v.badInput) return 'Indtast en gyldig værdi.';
  return 'Tjek venligst feltet.';
}

function showError(field: Field, message: string) {
  const error = document.getElementById(`${field.id}-fejl`);
  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
}

function validate(field: Field) {
  customChecks(field);
  const message = messageFor(field);
  showError(field, message);
  return !message;
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';

    const fields = Array.from(form.querySelectorAll<Field>('input:not([type=hidden]), select, textarea')).filter(
      (field) => field.id,
    );
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    const submitLabel = submit?.textContent ?? '';

    form.querySelectorAll<HTMLInputElement>('[data-min-today]').forEach((input) => (input.min = today()));

    const setStatus = (message: string) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('hidden', !message);
    };

    const setBusy = (busy: boolean) => {
      if (!submit) return;
      submit.disabled = busy;
      submit.textContent = busy ? 'Sender …' : submitLabel;
      submit.classList.toggle('opacity-70', busy);
    };

    // Valider, når man forlader et felt – og løbende, når der allerede vises en fejl
    fields.forEach((field) => {
      field.addEventListener('blur', () => validate(field));
      field.addEventListener('change', () => validate(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    // Hvis brugeren går tilbage til siden, skal knappen virke igen
    window.addEventListener('pageshow', () => setBusy(false));

    form.addEventListener('submit', async (event) => {
      setStatus('');
      const invalid = fields.filter((field) => !validate(field));

      if (invalid.length) {
        event.preventDefault();
        setStatus(
          invalid.length === 1 ? 'Der er ét felt, der skal rettes.' : `Der er ${invalid.length} felter, der skal rettes.`,
        );
        invalid[0].focus();
        return;
      }

      // Netlify: lad browseren sende formularen helt almindeligt
      if (form.dataset.provider !== 'formspree') {
        setBusy(true);
        return;
      }

      // Formspree: send i baggrunden og vis derefter kvitteringssiden
      event.preventDefault();
      setBusy(true);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(String(response.status));
        window.location.href = form.dataset.success || '/tak';
      } catch {
        setBusy(false);
        setStatus('Formularen kunne ikke sendes. Prøv igen, eller kontakt os direkte på telefon eller e-mail.');
      }
    });
  });
}

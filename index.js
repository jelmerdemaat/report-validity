export default (form) => {
    if (!form) {
        throw Error('Target form element missing for function `reportValidity`.')
    }

    if (HTMLFormElement.prototype.reportValidity) {
        return form.reportValidity();
    } else {
        if (form.checkValidity()) {
            return true;
        }

        if (!form.reportValidityFakeSubmit) {
            form.reportValidityFakeSubmit = document.createElement('button');
            form.reportValidityFakeSubmit.setAttribute('type', 'submit');
            form.reportValidityFakeSubmit.setAttribute('hidden', 'hidden');
            form.reportValidityFakeSubmit.setAttribute('style', 'display:none');
            form.reportValidityFakeSubmit.setAttribute('class', 'reportValidityFakeSubmit');

            form.reportValidityFakeSubmit.addEventListener('click', evt => {
                if (form.checkValidity()) {
                    evt.preventDefault();
                }
            });

            form.appendChild(form.reportValidityFakeSubmit);
        }

        form.reportValidityFakeSubmit.click();

        return false;
    }
}

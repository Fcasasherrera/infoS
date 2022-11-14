export const validationsTrustedContact = (values: any, errors: any) => {
  //Validate name
  if (!values.name) {
    errors.name = 'trustedContacts.validations.fieldRequired';
  } else if (values.name.length < 2) {
    errors.name = 'trustedContacts.validations.email';
  }

  //Validate phone number
  if (!values.phone) {
    errors.phone = 'trustedContacts.validations.fieldRequired';
  } else if (values.phone.length < 10) {
    errors.phone = 'trustedContacts.validations.phone';
  }

  //Validate kinship selected
  if (values.idKinship == null) {
    errors.idKinship = 'trustedContacts.validations.fieldRequired';
  }

  //Validate email 2
  if (!values.email) {
    errors.email = 'trustedContacts.validations.fieldRequired';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'trustedContacts.validations.email';
  }

  // Validate email
  /*   const regx = /^([A-Za-z0-9_\-\.])+\@([[A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!values.email || !regx.test(values.email))
      errors.email = 'no valid email'; */
};

import * as Localization from "expo-localization";

export const validateInputField = (label, type, value, t) => {
  if (value === "") {
    return t("formValidator.rempli", "Veuillez remplir tous les champs !");
  }

  switch (type) {
    case "number":
      if (isNaN(value)) {
        return (
          t("formValidator.Le champs", "Le champs ") +
          label +
          t(
            "formValidator.n'est pas un chiffre, veuillez le retaper !",
            " n'est pas un chiffre, veuillez le retaper ! "
          )
        );
      }
      break;
    case "phone":
      if (isNaN(value)) {
        return (
          t("formValidator.Le champs", "Le champs ") +
          label +
          t(
            "formValidator.n'est pas un numéro, veuillez le retaper !",
            " n'est pas un numéro, veuillez le retaper !"
          )
        );
      }
      if (value.length !== 10) {
        return (
          t("formValidator.Le champs", "Le champs ") +
          label +
          t(
            "formValidator.n'est pas un numéro, veuillez le retaper !",
            " n'est pas un numéro, veuillez le retaper !"
          )
        );
      }
      break;

    case "email":
      const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regMail.test(value) === false) {
        return (
          t("formValidator.Le champs", "Le champs ") +
          label +
          t("formValidator.email", " doit être une adresse email valide.")
        );
      }
      break;

    case "password":
      const regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
      if (regPass.test(value) === false) {
        return (
          t("formValidator.Le champs", "Le champs ") +
          label +
          t(
            "formValidator.doit avoir 8 chiffres, 1 lettre, 1 majuscule, 1 minuscule, 1 caractère spécial",
            " doit avoir 8 chiffres, 1 lettre, 1 majuscule, 1 minuscule, 1 caractère spécial"
          )
        );
      }
      break;
  }

  return "";
};

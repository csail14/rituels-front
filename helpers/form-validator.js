export const validateInputField = (label, type, value)=>{
    if(value === "") {
        return "Le champs "+label+" est vide !";
    }
    
    switch(type) {
        case "number":
            if(isNaN(value) ){
                return "Le champs "+label+" n'est pas un chiffre, veuillez le retaper !";
            }
        break;
        
        
        case "email":
            const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(regMail.test(value) === false) {
                 return  "Le champs "+label+" doit être une adresse email";
            }
        break
        
        case "password":
            const regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
            if(regPass.test(value) === false) {
                 return  "Le champs "+label+" doit avoir 8 chiffres, 1 lettre, 1 majuscule, 1 minuscule, 1 caractère spécial";
            }
        break
    }
    
    return ""
}
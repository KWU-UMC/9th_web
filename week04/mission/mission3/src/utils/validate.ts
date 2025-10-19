export type userSigninImformation = {
    email: string;
    password: string;
};

function validateUser(valuse: userSigninImformation) {
    const errors = {
        email: "",
        password: "",
    };

    if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(valuse.email)){
        errors.email = "올바른 이메일 형식이 아닙니다."
    }
    if(!(valuse.password.length >= 6 && valuse.password.length < 20)){
        errors.password = "비밀번호는 6~20자 사이로 입력해주세요.";
    }

    return errors;
}

function validateSignin(values: userSigninImformation){
    return validateUser(values);
}
export {validateSignin} ;
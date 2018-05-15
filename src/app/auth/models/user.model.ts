export interface Roles {
    student?: boolean;
    admin?: boolean;
}
export interface Operators {
    plus : boolean;
    minus :boolean;
    mult : boolean;
    div : boolean;
    exp : boolean;
}
export interface QuizSettings  {
    operators: Operators;
    allowNegative: boolean;
    minNumber : number;
    maxNumber : number;
    maxExpressionPerQuiz: number;
    minOperatorsPerExpression: number;
    maxOperatorsPerExpression: number;
    maxProposedSolutions: number;
    minExponentialNumber: number;
    maxExponentialNumber: number;
}
export class User {
    displayName: string;
    givenName: string;
    email: string;
//    photoURL: string;
    roles: Roles;
    uid: string;
    quizSettings: QuizSettings;

    constructor(authData) {
        this.uid=authData.user.uid;
        this.givenName = authData.additionalUserInfo.profile.given_name;
//                        providerId: value.additionalUserInfo.providerId,
        this.email = authData.user.email
//        this.photoURL = authData.user.photoURL
        this.roles = { admin: true, student: true }
        this.quizSettings = 
        {   
            minNumber:1,
            maxNumber: 10,
            allowNegative:false, 
            maxExpressionPerQuiz:5, 
            minOperatorsPerExpression:1, 
            maxOperatorsPerExpression:2, 
            maxProposedSolutions: 3,
            minExponentialNumber:1,
            maxExponentialNumber:4,
            operators: {plus : true, minus : true, mult: true, div: false, exp: false }
        };
    }
}
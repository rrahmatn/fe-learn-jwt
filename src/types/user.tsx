export interface Users {
    nim : number ,
    name : string ,
    email: string ,
}
export interface Registration{
    nim: number , 
    name: string ,
    email : string ,
    password: string,
    confirmPassword : string
}
export interface CheckNim{
    status: number,
    message: string
}
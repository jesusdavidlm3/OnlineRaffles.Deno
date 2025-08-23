export interface Iticket{
    id?: string,
    name: string,
    identification: number
    raffleId: string,
    phone: string,
    email: string,
    number: number[],
    receipt?: string
}
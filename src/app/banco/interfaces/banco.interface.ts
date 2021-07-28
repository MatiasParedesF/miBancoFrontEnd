export interface RESTBankResponse {
    banks: Bank[];
}

export interface Bank {
    name: string;
    id:   string;
}

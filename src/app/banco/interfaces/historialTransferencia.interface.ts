export interface HistorialTransferencias {
    fecha:        Date;
    usuario:      string;
    destinatario: Destinatario[];
    monto:        number;
}

export interface Destinatario {
    _id:      string;
    nombre:   string;
    run:      string;
    dv:       string;
    banco:    Banco[];
    cuenta:   Cuenta[];
    usuario:  string;
    correo:   string;
    telefono: string;
}

export interface Banco {
    nombre: string;
    id:     string;
}

export interface Cuenta {
    tipo:   string;
    numero: number;
}

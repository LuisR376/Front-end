export interface Ticket {
    idfolios?: number;
    numEmpl_Tecnicos?: number;
    fecha_registro?: Date;
    idusuarios?: number;
    idtipo_servicio?: number;
    asunto?: string;
    mensaje?: string;
    foto1?: string;
    foto2?: string;
    foto3?: string;
    foto4?: string;
    solucion?: string;
    firma?: string;
    idstatusticket?:number;
    
    nombre?: string;
    descripcion?: string;
    num_folio?: string;
    num_empleado?: number;
    estado_ticket?: string;
    nombre_area?: string;
    lugares?: string;
    ubicacion?: string;
}

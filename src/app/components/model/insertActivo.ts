export class insertActivo {
    constructor(
        public idlugar              : number | undefined | null,
        public idarea               : number | undefined | null,
        public nombre_propietario   : string | undefined | null,
        public nombre_equipo        : string | undefined | null,
        public num_empleado         : number | undefined | null,
        public password             : string | undefined | null,
        public fecha_mantenimiento  : Date   | undefined | null,
        public valor_monetario      : number | undefined | null,
        public estado               : number | undefined | null,
        public descripcion          : string | undefined | null,
        public tipo_de_conexion     : string | undefined | null,

        public iddetallepc          : number | undefined | null,
        public idLicencias          : number | undefined | null,
        public idtipoactivo         : number | undefined | null,

        public host_teamviewer      : string | undefined | null,
        public password_teamviewer  : string | undefined | null,
        public calculoEstimado      : string | undefined | null,
        public Pertenencia          : string | undefined | null,

        public tipo_activo_desc     : string | undefined | null
    ) { }

}
interface estado {
    label: string;
    value: string;
}
export interface Activos
{
    id?:                    string;
    idactivos?:             number;
    idlugar?:               number;
    idarea?:                number;
    nombre_propietario?:    string;
    nombre_equipo?:         string;
    num_empleado?:          number;
    password?:              string;
    fecha_mantenimiento?:   Date;
    valor_monetario?:       number;
    estado?:                number;
    descripcion?:           string;
    tipo_de_conexion?:      string;
    iddetallepc?:           number;
    idLicencias?:           number;
    idtipoactivo?:          number;
    host_teamviewer?:       string;
    password_teamviewer?:   string;
    calculoEstimado?:       string;
    Pertenencia?:           string;
    num_inventario?:        string;

}
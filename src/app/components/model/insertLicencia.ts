export class insertLicencia{
    constructor(
        public numserie_licencia: string | undefined | null,
        public tipo_licencia: string | undefined | null,
        public nombre: string | undefined | null,
        public folio_compra: string | undefined | null,
        public formato: string | undefined | null,
        public descripcion: string | undefined | null
    ){}
    
}
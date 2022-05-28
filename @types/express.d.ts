declare namespace Express {
    namespace Multer {
        interface File extends Multer.File {
            key: string
            location?: string
        }
    }
}

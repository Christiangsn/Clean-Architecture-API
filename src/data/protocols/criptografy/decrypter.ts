export interface DecrypterToken {
    decrypt (token: string): Promise<string>
}

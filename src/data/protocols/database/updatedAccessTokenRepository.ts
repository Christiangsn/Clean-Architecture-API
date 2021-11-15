export interface UpdateAccessTokenRepository {
    updated (id: string, token: string): Promise<void>
}

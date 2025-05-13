// エラーコードの定義
export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

// エラーメッセージの定義
export const ErrorMessages = {
    [ErrorCodes.VALIDATION_ERROR]: 'ユーザー名とパスワードは必須です',
    [ErrorCodes.NETWORK_ERROR]: 'ネットワーク接続に問題があります',
    [ErrorCodes.SERVER_ERROR]: 'サーバーでエラーが発生しました',
    [ErrorCodes.AUTHENTICATION_ERROR]: '認証に失敗しました',
    [ErrorCodes.UNKNOWN_ERROR]: '予期せぬエラーが発生しました'
} as const;
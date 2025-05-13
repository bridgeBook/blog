// 1. 必要なインポート
import { createContext, useContext, useState, ReactNode } from 'react';

// 2. コンテキストの型定義
interface AuthContextType {
    isAuthenticated: boolean;    // ログイン状態
    username: string | null;     // ユーザー名
    login: (username: string, token: string) => void;  // ログイン関数
    logout: () => void;         // ログアウト関数
}

// 3. コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. プロバイダーコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 4.1 状態の初期化（localStorageから値を取得）
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('token') !== null;
    });
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('username');
    });

    // 4.2 ログイン関数
    const login = (username: string, token: string) => {
        // localStorageに保存
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        // 状態を更新
        setIsAuthenticated(true);
        setUsername(username);
    };

    // 4.3 ログアウト関数
    const logout = () => {
        // localStorageから削除
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // 状態を更新
        setIsAuthenticated(false);
        setUsername(null);
    };

    // 4.4 コンテキストの値を提供
    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. カスタムフック
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { memo, useMemo } from 'react';
import { ButtonUI } from './UI';

const Header = memo(() => {
  const { isAuthenticated, username, logout } = useAuth();

  const authContent = useMemo(() => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {username}さん
          </span>
          <Link
            to="/create-post"
            className={ButtonUI}
          >
            記事を投稿する
          </Link>
          <button
            onClick={logout}
            className={ButtonUI}
          >
            ログアウト
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/Login"
          className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          ログイン
        </Link>
        <Link
          to="/Signup"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          新規登録
        </Link>
      </div>
    );
  }, [isAuthenticated, username, logout]);

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {authContent}
          </div>
        </div>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
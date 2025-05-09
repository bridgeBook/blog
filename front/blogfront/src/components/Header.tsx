import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600">Blog</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/Login"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              ログイン
            </Link>
            <Link
              to="/Signup"
              className="text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
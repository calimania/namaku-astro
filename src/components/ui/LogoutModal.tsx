
import { IconX} from '@tabler/icons-react';

const handleLogout = () => {
  localStorage.removeItem('namaku.auth');
  window.location.href = '/auth';
  // Clear tanstack query cache
};

const LogoutModal = ({ show, setShow }: { show: boolean, setShow:  React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    show && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 w-full max-w-sm relative animate-fade-in">
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <IconX size={18} />
          </button>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Log out?</h3>
          <p className="text-gray-600 mb-4 text-sm">Are you sure you want to log out? You&apos;ll need to log in again to access your portal.</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-emerald-600 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          >
            Log out
          </button>
        </div>
      </div>
    )
  )
}

export default LogoutModal;

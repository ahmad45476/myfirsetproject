import { Link } from 'react-router-dom';

const UserInfoCard = ({ user, isCurrentUser, showArtworksCount, artworksCount, disableLinks }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.profileImage || '/default-avatar.jpg'}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">
              {!disableLinks ? (
                <Link to={`/artist/${user.id}`} className="hover:text-[#d5006d]">
                  {user.fullName}
                </Link>
              ) : (
                <span>{user.fullName}</span>
              )}
            </h3>
            <p className="text-gray-600 text-sm">@{user.username}</p>
          </div>
        </div>
      </div>
      
      {showArtworksCount && (
        <div className="px-4 py-2 bg-gray-100">
          <p className="text-sm text-gray-600">
            عدد الأعمال: {artworksCount}
          </p>
        </div>
      )}
      
      {isCurrentUser && !disableLinks && (
        <div className="mt-6 px-4 pb-4">
          <Link 
            to="/add-artwork" 
            className="w-full px-4 py-2 bg-[#d5006d] text-white rounded-lg block text-center hover:bg-[#b0005a] transition"
          >
            إضافة عمل فني
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
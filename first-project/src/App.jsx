import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Explore from "./Pages/Explore";
import ArtworkDetail from "./Pages/ArtworkDetail";
import AddArtwork from './Components/AddArtwork';
import EditArtwork from './Components/EditArtwork';
import EditProfile from './Components/EditProfile';
import Register from './Components/Register';
import Login from './Components/Login';
import ArtistsPage from './Pages/ArtistsPage';
import { ArtworkProvider } from './context/ArtworkContext'; // تأكد من المسار الصحيح
import { AuthProvider } from './context/AuthContext';

import ArtistPage from './Pages/ArtistPage';

// أضف هذا المسار


function App() {
  return (
   
     <AuthProvider>
    <ArtworkProvider>
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="auth" element={<LoginPage />} />
      <Route path='profile' element={<ProfilePage/>}/>
      <Route path="/explore" element={<Explore />} />
      <Route path="/artwork/:id" element={<ArtworkDetail />} />
    
      <Route path="/add-artwork" element={<AddArtwork />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/edit-artwork/:id" element={<EditArtwork />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/artist/:id" element={<ArtistPage />} />
    </Routes>
     </ArtworkProvider>
     </AuthProvider>
    
  );
}

export default App;
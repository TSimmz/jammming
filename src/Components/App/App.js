import React from 'react';
import './App.css';
import Navbar from '../Nav/NavBar';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='App'>
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
};

export default App;

// export class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchResults: [],
//       playlistName: 'New Playlist',
//       playlistTracks: [],
//       isLoggedIn: false,
//     };

//     this.handleLogin = this.handleLogin.bind(this);
//   }

//   // Checks if we have the access token and redirects to spotify if not
//   handleLogin() {
//     const accessToken = Spotify.getAccessToken();
//     this.setState({ isLoggedIn: accessToken !== undefined });
//   }

//   render() {
//     return (
//       <div>
//         <Navbar
//           isLoggedIn={this.state.isLoggedIn}
//           handleLogin={this.handleLogin}
//         />
//         <div className='App'>
//           <SearchBar />
//           <div className='App-playlist'>
//             <SearchResults />
//             <Playlist />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

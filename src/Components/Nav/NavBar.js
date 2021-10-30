import React from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccessToken } from '../../features/LoginToSpotify/loginToSpotifySlice';
import { selectIsLoggedIn } from '../../features/LoginToSpotify/loginToSpotifySlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buttonStyle = {
    visibility: `${isLoggedIn ? 'hidden' : 'visible'}`,
  };

  const handleLogin = () => {
    dispatch(getUserAccessToken());
  };

  return (
    <nav>
      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <button className='sign-in' onClick={handleLogin} style={buttonStyle}>
        LOG IN
      </button>
    </nav>
  );
};

export default Navbar;

// export class Navbar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleLogin = this.handleLogin.bind(this);
//   }

//   handleLogin() {
//     this.props.handleLogin();
//   }

//   render() {
//     const buttonStyle = {
//       visibility: `${this.props.isLoggedIn ? 'hidden' : 'visible'}`,
//     };

//     return (
//       <nav>
//         <h1>
//           Ja<span className='highlight'>mmm</span>ing
//         </h1>
//         <button
//           className='sign-in'
//           onClick={this.handleLogin}
//           style={buttonStyle}>
//           LOG IN
//         </button>
//       </nav>
//     );
//   }
// }

import React from 'react';
/*import {Grid, Row, Col} from 'react-flexbox-grid';*/

class Profile extends React.Component {


    render() {
        return (

            <h1>{this.props.userInfo.name}</h1>


        );
    }
}

export default Profile;
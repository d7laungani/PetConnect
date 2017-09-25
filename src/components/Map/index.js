import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import RaisedButton from 'material-ui/RaisedButton';

import Shelters from '../../shelters.json'

class MapContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
            shelters: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }

        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    componentWillMount () {


        if (this.state.shelters.length < 1) {
            console.log('mapping shelter')
            this.mapShelters(Shelters)
        }
    }



    mapShelters(Shelters) {

        let shelters = Shelters.shelters
        let updated = shelters.filter(element => {
            if ( element.pets.length >= 3) {
                return element
            }
        });


        let markers = updated.map( (element, key) => {
           return (
               <Marker
                   key={key}
                   name={element.shelter}
                   position={{lat: element.latitude, lng: element.longitude}}
                   title={'Pet Info:' + element.pets}
                   phone={'Phone: ' + element.phone}
                   notes={'Notes: ' + element.notes}
                   onClick={this.onMarkerClick}
               />

           )
        });

        this.setState({shelters: markers})
    }


    render() {
        console.log(this.state.activeMarker)
        console.log(this.state.showingInfoWindow)
        return (
            <div>
                <RaisedButton label="Search for Pets" primary={true} style={{float: 'right',marginBottom: '3%'}} onClick={this.props.searchPets}/>
                <h2 style={{textAlign: 'left'}}> Pet Friendly Shelters : </h2>
                <h4 style={{textAlign: 'left'}}> Click marker to get more info </h4>
                    <Map google={this.props.google} zoom={10} initialCenter={{
                        lat: 29.7604,
                        lng: -95.3698
                    }}   style={{width: '80%', height: '70%',  position: 'absolute'}}
                         clickableIcons={false}>
                        {this.state.shelters}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h2>{this.state.selectedPlace.name}</h2>
                                <h4>{this.state.selectedPlace.title}</h4>
                                <h4>{this.state.selectedPlace.phone}</h4>
                                <h4>{this.state.selectedPlace.notes}</h4>
                            </div>
                        </InfoWindow>
                    </Map>
            </div>
        );


    }
    onMarkerClick (props, marker, e) {
      console.log('clicking')
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }



}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAoYo5Qm8_-p39-w-d7MOUMHLIB6IRr9qk'
})(MapContainer)

/*

 <Marker
 name={'Rice university park'}
 position={{lat: 29.7174, lng: -95.4018}}
 title={'The marker`s title will appear as a tooltip.'}
 onClick={this.onMarkerClick}
 />
 */
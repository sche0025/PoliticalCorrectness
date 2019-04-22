import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css'


class SimpleMap extends Component {

    state = {
        center: {
            lat: -25.734968,
            lng: 134.489563
        },

        scrollable: false,
        zoom: 5,
        markers:
            [{lat: -25.734968, lng: 133.489563, text: 'WOW1'},
                {lat: -27.734968, lng: 134.489563, text: 'WOW2'},
                {lat: -23.734968, lng: 135.489563, text: 'WOW3'}],
    };

    getPos = (e) => {
        console.log('lat', e.lat);
        console.log('log', e.lng);
    }

    clickMark = (e) => {
        console.log('mark clicked');
    }

    renderMarker = (map, maps) => {
        new maps.Marker({
            map: map,
            position: new maps.LatLng(-25.734968, 134.489563),
            title: 'Empire',
        });

        new maps.Marker({
            map: map,
            position: new maps.LatLng(-27.734968, 134.489563),
            title: 'Empire'
        });
    };

    markerClicked(marker){
        console.log("test");
    }

    render() {
        const AnyReactComponent = ({text}) => <div>{text}</div>;

        return (
            // Important! Always set the container height explicitly
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY'}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={(e) => this.getPos(e)}
                    options={{
                        scrollwheel: false,
                        draggable: false,
                        fullscreenControl: false,
                        zoomControl: false,

                    }}
                    onGoogleApiLoaded={({map, maps}) => this.renderMarker(map, maps)}
                >
                    {/*{this.state.markers.map((marker, i) => {*/}
                        {/*return (*/}
                            {/*<AnyReactComponent*/}
                                {/*lat={marker.lat}*/}
                                {/*lng={marker.lng}*/}
                                {/*text={marker.text}*/}
                                {/*onChildClick={this.markerClicked.bind(this, marker)}*/}
                            {/*/>*/}
                        {/*)*/}
                    {/*})}*/}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Map from "../../routes/Map";
import './style.css'

export default class GoogleMap extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            map: null
        }


    }


    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        var heatmap = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY&libraries=visualization&callback=initMap'
        // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY&callback=initMap")
        loadScript(heatmap)
        window.initMap = this.initMap
    }

    codeAddress = () => {
        var geocoder = new window.google.maps.Geocoder;
        var obj = this
        // console.log(this.state.map)
        geocoder.geocode({
            componentRestrictions: {
                country: 'AU',
                postalCode: '2000'
            }
        }, function (results, status) {
            if (status == 'OK') {
                console.log(results[0].geometry.location.lat, results[0].geometry.location.lng)
                var marker = new window.google.maps.Marker({
                    map: obj.state.map,
                    position: results[0].geometry.location
                });
            } else {
                window.alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    initMap = () => {

        let obj = this
        console.log(this)
        // let newFun =  this.handleMouseover()

        // var map = new window.google.maps.GoogleMap
        //
        // var bounds = {
        //     north: -34.36,
        //     south: -47.35,
        //     west: 166.28,
        //     east: -175.81,
        // }
        //
        // bounds = new window.google.maps.LatLngBounds()
        // (document.getElementById('map'), {
        //         // center: {lat: -28.734968, lng: 133.489563},
        //      center: {lat: -37.06, lng: 174.58},
        //         zoom: 4.85,
        //         draggable: true,
        //         scrollwheel: true,
        //         fullscreen: false,
        //         streetViewControl: false,
        //         fullscreenControl: false,
        //         zoomControl: false,
        //         restriction: {
        //             latLngBounds: bounds,
        //             strictBounds: false,
        //         },
        //
        //     }
        // )

        var map;
        var AUSTRALIA_BOUNDS = {
            north: -11,
            south: -43,
            west: 110,
            east: 154,
        };
        var AUSTRALIA = {lat: -28.734968, lng: 133.489563};
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: AUSTRALIA,
            restriction: {
                latLngBounds: AUSTRALIA_BOUNDS,
                strictBounds: false,
            },
            zoom: 4.5,
            draggable: true,
            scrollwheel: true,
            fullscreen: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            minZoom:4.5,
            // maxZoom:5
        });

       var heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: [ new window.google.maps.LatLng(-37.8, 144.989563)],
            map: map
        });

        function toggleHeatmap() {
            heatmap.setMap(heatmap.getMap() ? null : map);
        }

        // map.fitBounds( new window.google.maps.LatLngBounds());
        this.setState({
            map: map
        })

        map.addListener('click', function (e) {
            console.log(e.latLng.lat(), e.latLng.lng())
        })

        this.addMarkers(map)

    }

    addMarkers = () => {
        let obj = this

        // this.marker = new window.google.maps.Marker({
        //     position: {lat: -19.64, lng: 133.48},
        //     map: this.state.map,
        // });
        //
        this.addAMarker(-19.64, 133.48, 'Northern Territory')
        this.addAMarker(-26.16, 121.66, 'Western Australia')
        this.addAMarker(-23.12, 143.89, 'Queensland')
        this.addAMarker(-29.80, 134.71, 'South Australia')
        this.addAMarker(-32.50, 146.29, 'New South Wales')
        this.addAMarker(-19.64, 133.48, 'Northern Territory')
        this.addAMarker(-42.14, 146.54, 'Tasmania')
    }

    addAMarker = (lat, lng, text) => {
        let obj = this

        var infoWindow = new window.google.maps.InfoWindow(
            {
                content: '<h1> ' + text + ' </h1>',
                disableAutoPan: true
            }
        )

        var marker = new window.google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: this.state.map,
        });

        marker.addListener('mouseover', function () {
            infoWindow.open(obj.state.map, marker)
        })

        marker.addListener('mouseout', function () {
            infoWindow.close()
        })

        marker.addListener('click', function () {
            obj.codeAddress()
        })

    }

    render() {
        return (
            <Fragment>
                <button onClick="toggleHeatmap()">Toggle Heatmap</button>
                <div id={'map'}></div>
            </Fragment>
        );
    }
}

function loadScript(url) {
    var index = document.getElementsByTagName('script')[0]
    var script = document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


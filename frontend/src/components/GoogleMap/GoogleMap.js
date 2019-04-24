import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Map from "../../routes/Map";
import './GoogleMap.css'
import store from '../../store/index'
// import geoJsonList from '../../index'
import ReactDOMServer from 'react-dom/server';
import wa from '../../assets/GeoJson/WA'
import nsw from '../../assets/GeoJson/NSW'
import ta from '../../assets/GeoJson/TA'
import qld from '../../assets/GeoJson/QLD'
import act from '../../assets/GeoJson/ACT'
import vic from '../../assets/GeoJson/VIC'
import sa from '../../assets/GeoJson/SA'
import na from '../../assets/GeoJson/NA'

export default class GoogleMap extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            map: null,
            heatmap: null,
            data: []

        };
    }

    componentDidMount() {

        console.log(window.google);

        this.renderMap()

    }

    renderMap = () => {
        var googleMap = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY&libraries=visualization&callback=initMap'
        // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY&callback=initMap")
        loadScript(googleMap)
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

    showHeatPoints = () => {

    }

    initMap = () => {

        let obj = this
        // console.log('what?',this)

        var map;
        var AUSTRALIA_BOUNDS = {
            north: -11,
            south: -44.5,
            west: 110,
            east: 154,
        };

        var AUSTRALIA = {lat: -28.734968, lng: 133.489563};
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: AUSTRALIA,
            disableDoubleClickZoom: true,
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
            minZoom: 4.5,
        });


        // map.data.addGeoJson(geoJsonList.wa);
        // map.data.addGeoJson(geoJsonList.nsw);
        // map.data.addGeoJson(geoJsonList.ta);
        // map.data.addGeoJson(geoJsonList.qld);
        // map.data.addGeoJson(geoJsonList.act);
        // map.data.addGeoJson(geoJsonList.vic);
        // map.data.addGeoJson(geoJsonList.sa);
        // map.data.addGeoJson(geoJsonList.na);

        this.loadGeojson(map)

        // var features = map.data.addGeoJson(ta);
        // console.log(features)
        //



        this.setState({
            map: map
        })
    }


    polygonLicked = (event)=>{
        var action = {
            value:event.feature.getProperty("Sortname"),
            type:"MAP_UPDATE_DETAIL"
        }
        store.dispatch(action)

    }

    loadGeojson=(map)=>{
        var me = this
        var infoWindow = null
        var features = null;
        map.data.addGeoJson(wa);
        map.data.addGeoJson(na);
        map.data.addGeoJson(nsw);
        map.data.addGeoJson(ta);
        map.data.addGeoJson(qld);
        map.data.addGeoJson(act);
        map.data.addGeoJson(vic);
        map.data.addGeoJson(sa);
        var features = map.data;

        map.data.setStyle(function (feature) {
            return ({
                strokeWeight: 1,
            });
        });


        map.data.addListener('mouseover', function(event) {


            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {fillColor: 'blue'});

            infoWindow = new window.google.maps.InfoWindow;
            infoWindow.setContent(me.getImg('https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png'));
            infoWindow.setPosition(event.latLng);
            infoWindow.open(me.state.map)
        });

        map.data.addListener('mouseout', function(event) {
            map.data.revertStyle();
            infoWindow.close()
        });


        map.data.addListener('click', function (event) {
            me.polygonLicked(event)
        })

    }

    // addMarkers = () => {
    //     let obj = this
    //
    //     this.addAMarker(-19.64, 133.48, 'Northern Territory')
    //     this.addAMarker(-26.16, 121.66, 'Western Australia')
    //     this.addAMarker(-23.12, 143.89, 'Queensland')
    //     this.addAMarker(-29.80, 134.71, 'South Australia')
    //     this.addAMarker(-32.50, 146.29, 'New South Wales')
    //     this.addAMarker(-19.64, 133.48, 'Northern Territory')
    //     this.addAMarker(-42.14, 146.54, 'Tasmania')
    //     this.addAMarker(-35, 149.54, 'Canberra')
    // }


    getImg = (img) => {

        var html = <div>

            <img alt="example" src={img}  className="smallImg" />
            <img alt="example" src={img}  className="smallImg" />
        </div>

       var stringHTML =  ReactDOMServer.renderToString(html)

        // console.log(stringHTML)
        return stringHTML
    }

    // addAMarker = (lat, lng, text) => {
    //
    //     let obj = this
    //     // console.log(this.getImg())
    //     var infoWindow = new window.google.maps.InfoWindow(
    //         {
    //             content: this.getImg('https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png'),
    //             disableAutoPan: true
    //         }
    //     )
    //
    //     var marker = new window.google.maps.Marker({
    //         position: {lat: lat, lng: lng},
    //         map: this.state.map,
    //     });
    //
    //     marker.addListener('mouseover', (function () {
    //         infoWindow.open(obj.state.map, marker)
    //     }))
    //
    //     marker.addListener('mouseout', (function () {
    //         infoWindow.close()
    //     }))
    //
    //     marker.addListener('click', (function () {
    //         // obj.codeAddress()
    //         obj.handleMarkerClicked()
    //         // obj.showHeatPoints()
    //     }))
    // }

    generateRandomData = () => {
        var datalist = []
        for (var i = 0; i < 200; i++) {
            var lat = ((Math.floor(Math.random() * 1000) + 1) * 1 + 2000) / -100
            var lng = ((Math.floor(Math.random() * 35) + 1) + 115)
            var newCor = new window.google.maps.LatLng(lat, lng)
            // console.log(lat,lng)
            datalist.push(newCor)
        }
        // console.log(datalist[0].lat,datalist[0].lng)
        return datalist

        // var a = new window.google.maps.LatLng(-37.8, 144.989563)
        // return  a
    }

    handleMarkerClicked = () => {
        console.log(this.state.heatmap)
        this.state.heatmap.set('data', (this.generateRandomData()))
        // var newHeatMap = this.state.heatmap
        // newHeatMap.set('data',this.generateRandomData())
        // this.setState({
        //     data:this.generateRandomData()
        // })
        // heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }

    componentWillUnmount() {
        var me = this
        var elem = document.querySelector('#my-google-script');
        elem.parentNode.removeChild(elem);
        // var elem1 = document.querySelector('#map');
        // elem1.parentNode.removeChild(elem1);
        //clear memory
        this.state.map.data.forEach(function (feature) {

            // console.log(feature);
            me.state.map.data.remove(feature);

        });
       //
       // window.google = null
    }


    render() {

        // console.log(this.state.data);
        return (
            <Fragment>
                <div id={'map'}></div>
            </Fragment>
        );
    }
}

var loadScript = (url) => {
    var index = document.getElementsByTagName('script')[0]
    var script = document.createElement('script')
    script.setAttribute('id', 'my-google-script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}



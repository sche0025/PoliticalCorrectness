import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Map from "../../routes/Map";
import './GoogleMap.css'
import {Popover, notification} from 'antd'
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

import {getLeaderboardData} from "../../utils/api";
import {calculateSentimentScore} from "../../utils/utils";


export default class GoogleMap extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            map: null,
            heatmap: null,
            data: [],
            politiciansData: []

        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState(
            {
                politiciansData: nextProps.data
            }
        );
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
            mapTypeControl: false,
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

        var centerControlDiv = document.createElement('div');
        var centerControl = this.CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        // var marker = new window.google.maps.Marker({
        //     position: window.google.maps.ControlPosition.BOTTOM_LEFT,
        //     map: map,
        //     title: 'Uluru (Ayers Rock)'
        // });
        //
        // var infowindow = new window.google.maps.InfoWindow({
        //     content: "test"
        // });
        // marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        // });

        map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

        this.setState({
            map: map
        })
    }


    CenterControl = (controlDiv, map) => {
        var me = this
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'See statistics';
        controlUI.appendChild(controlText);


        var infoWindow = new window.google.maps.InfoWindow(
            {
                content: this.getTextInfowindow(),
                disableAutoPan: true
            }
        )

        // marker.addListener('mouseover', (function () {
        //     infoWindow.open(obj.state.map, marker)
        // }))
        //
        // marker.addListener('mouseout', (function () {
        //     infoWindow.close()
        // }))
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function () {
            me.openNotification()
        });

    }

    openNotification = () => {
        notification.open({
            message: <span className={"statistics"}>Potential number of winners of each party(by constituency)</span>,
            description: this.getStatistics(),
            duration: 0
        });
    };

    getStatistics = () => {

        var winnerParties = this.getWinners()
        // return winnerParties.map((partyInfo)=>{
        //     var string = partyInfo[0] + " "+ partyInfo[1]
        //     return <div style={{padding:"5px"}} className={"statistics"}>{string}</div>
        // })
        var i =0;
        return <table style={{width: "100%"}} className={"statistics"}>
            <tr>
                <td>#</td>
                <td>Party</td>
                <td>Number of Winners</td>
            </tr>
            {
                winnerParties.map(partyIfo => {
                    i ++
                    var partyName =  "."+partyIfo[0]
                    var count = partyIfo[1]
                    return <tr>
                        <td>{i}</td>
                        <td>{partyName}</td>
                        <td>{count}</td>
                    </tr>

                })
            }

        </table>

    }

    getTextInfowindow = () => {

        var html = <div>
            WOW

        </div>

        var stringHTML = ReactDOMServer.renderToString(html)

        // console.log(stringHTML)
        return stringHTML
    }


    polygonLicked = (event) => {
        var action = {
            value: event.feature.getProperty("Sortname"),
            type: "MAP_UPDATE_DETAIL"
        }
        store.dispatch(action)

    }

    loadGeojson = (map) => {
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

        //
        map.data.addListener('mouseover', function (event) {


            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {fillColor: 'blue'});

            // infoWindow = new window.google.maps.InfoWindow;
            // infoWindow.setContent(me.getImg('https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png')
            //
            // );
            // infoWindow.setPosition(event.latLng);
            // infoWindow.open(me.state.map)
        });

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
            // infoWindow.close()
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

            <img alt="example" src={img} className="smallImg"/>
            <img alt="example" src={img} className="smallImg"/>
        </div>

        var stringHTML = ReactDOMServer.renderToString(html)

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

    getWinners = () => {
        var politicians = this.state.politiciansData
        var regions = new Set()
        if (politicians && politicians != []) {
            politicians.map((politician) => {
                regions.add(politician.Electoral_District.toLowerCase())
            })

            regions = Array.from(regions);
            var regionMap = {}
            regions.map((region) => {
                regionMap[region] = []
            })
            politicians.map((politician) => {
                regionMap[politician.Electoral_District.toLowerCase()].push({
                    party: politician.Party,
                    sc: calculateSentimentScore(politician)
                })
            })

            for (let key in regionMap) {
                // check if the property/key is defined in the object itself, not in parent
                if (regionMap.hasOwnProperty(key)) {
                    regionMap[key].sort(function (a, b) {
                        return (
                            (
                                b.sc
                            )
                            -
                            (
                                a.sc
                            )
                        )
                    })
                }
            }
            var result = {}

            for (let key in regionMap) {
                // console.log(regionMap[key][0].party)
                var curParty = regionMap[key][0].party
                if (!result.hasOwnProperty(curParty)) {
                    result[curParty] = 1
                } else {
                    result[curParty] = result[curParty] + 1
                }
            }

            // regionMap.map(region =>{
            //     if(!result.hasOwnProperty(region)){
            //         result[region] = 1
            //     }else{
            //         result[region] = result[region] + 1
            //     }
            // })
            var sortedResult = [];
            for (var party in result) {
                sortedResult.push([party, result[party]]);
            }

            sortedResult.sort(function (a, b) {
                return b[1] - a[1];
            });
            return sortedResult
            // console.log("regions:", result)
        }

    }

    render() {
        // console.log("map loaded", this.state.politiciansData)

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



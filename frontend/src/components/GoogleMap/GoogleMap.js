import React, {Fragment} from 'react';
import './GoogleMap.css'
import {notification} from 'antd'
import store from '../../store/index'
import ReactDOMServer from 'react-dom/server';
import wa from '../../assets/GeoJson/WA'
import nsw from '../../assets/GeoJson/NSW'
import ta from '../../assets/GeoJson/TA'
import qld from '../../assets/GeoJson/QLD'
import act from '../../assets/GeoJson/ACT'
import vic from '../../assets/GeoJson/VIC'
import sa from '../../assets/GeoJson/SA'
import na from '../../assets/GeoJson/NA'
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

        this.renderMap()

    }

    renderMap = () => {
        var googleMap = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEGnKK5sbPBXi2tL4o7LFahhEniTaLQTY&libraries=visualization&callback=initMap'
        loadScript(googleMap)
        window.initMap = this.initMap
    }


    initMap = () => {


        var AUSTRALIA_BOUNDS = {
            north: -11,
            south: -44.5,
            west: 110,
            east: 154,
        };

        // set the default parameter of the google map
        var AUSTRALIA = {lat: -28.734968, lng: 133.489563};
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: AUSTRALIA,
            disableDoubleClickZoom: true,
            restriction: {
                latLngBounds: AUSTRALIA_BOUNDS,
                strictBounds: false,
            },
            mapTypeControl: true,
            zoom: 4.5,
            draggable: true,
            scrollwheel: true,
            fullscreen: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            minZoom: 4.5,
        });


        this.loadGeojson(map)

        var centerControlDiv = document.createElement('div');

        centerControlDiv.index = 1;

        map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

        this.setState({
            map: map
        })
    }


    //show statistics
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


        controlUI.addEventListener('click', function () {
            me.openNotification()
        });

    }

    //open statistics
    openNotification = () => {
        notification.open({
            message: <span className={"statistics"}>Potential number of winners of each party(by constituency) till {store.getState().date}</span>,
            description: this.getStatistics(),
            duration: 0
        });
    };

    getStatistics = () => {
        var winnerParties = this.getWinners()

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

        return stringHTML
    }

    // constituency click event
    polygonLicked = (event) => {
        var action = {
            value: event.feature.getProperty("Sortname"),
            type: "MAP_UPDATE_DETAIL"
        }
        store.dispatch(action)

    }

    loadGeojson = (map) => {
        var me = this

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
                // fillColor: "white",
               fillOpacity:0.2
            });
        });

        //
        map.data.addListener('mouseover', function (event) {


            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {fillColor: 'blue'});


        });

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
        });


        map.data.addListener('click', function (event) {
            me.polygonLicked(event)
        })

    }


    //unload google map api
    componentWillUnmount() {
        var me = this
        var elem = document.querySelector('#my-google-script');
        elem.parentNode.removeChild(elem);

        this.state.map.data.forEach(function (feature) {

            me.state.map.data.remove(feature);

        });

    }

    //algorithm to predict winning seats
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

                var curParty = regionMap[key][0].party
                if(regionMap[key][0].sc >0){
                    if (!result.hasOwnProperty(curParty)) {
                        result[curParty] = 1
                    } else {
                        result[curParty] = result[curParty] + 1
                    }
                }
            }

            var sortedResult = [];
            for (var party in result) {

                sortedResult.push([party, result[party]]);

            }

            sortedResult.sort(function (a, b) {
                return b[1] - a[1];
            });
            return sortedResult

        }

    }

    render() {

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



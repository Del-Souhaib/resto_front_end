import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {CaretDownOutlined} from "@ant-design/icons";
import 'leaflet/dist/leaflet.css'
import { icon } from "leaflet"


const ICON = icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [20,32],
})

export default function MyMap(props) {
    console.log(props)
    return (
        <MapContainer center={[props.data.lat, props.data.long0]} zoom={13} scrollWheelZoom={false} style={{width:'100%', height :400}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[props.data.lat, props.data.long0]}
                    icon={ICON}

            >
                <Popup>
                    {props.data.name} <br/> {props.data.adresse}
                </Popup>
            </Marker>
        </MapContainer>

    )
}
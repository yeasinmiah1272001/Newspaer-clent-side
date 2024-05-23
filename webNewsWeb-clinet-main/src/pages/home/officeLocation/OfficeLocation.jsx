import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";
import Container from "../../../components/container/Container";
import Title from "../../../components/title/Title";

const OfficeLocation = () => {
  const center = [23.8041, 90.4152];
  const rectangle = [
    [23.8041, 90.4152],
    [23.8041, 90.4152],
  ];

  return (
    <section className="mt-20">
      <Container className="w-full">
        <Title>Office Location</Title>
        <div className="w-full h-full overflow-hidden mt-12">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.Overlay name="Marker with popup">
                <Marker position={center}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Layer group with circles">
                <LayerGroup>
                  <Circle
                    center={center}
                    pathOptions={{ fillColor: "blue" }}
                    radius={200}
                  />
                  <Circle
                    center={center}
                    pathOptions={{ fillColor: "red" }}
                    radius={100}
                    stroke={false}
                  />
                  <LayerGroup>
                    <Circle
                      center={center}
                      pathOptions={{ color: "green", fillColor: "green" }}
                      radius={100}
                    />
                  </LayerGroup>
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Feature group">
                <FeatureGroup pathOptions={{ color: "purple" }}>
                  <Popup>Popup in FeatureGroup</Popup>
                  <Circle center={center} radius={200} />
                  <Rectangle bounds={rectangle} />
                </FeatureGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
          ,
        </div>
      </Container>
    </section>
  );
};

export default OfficeLocation;

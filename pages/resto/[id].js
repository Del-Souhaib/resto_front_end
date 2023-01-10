import {Carousel, Col, Descriptions, Image, Rate, Row} from "antd";
import React from "react";
import MyMenue from "../../components/menue";

import MyMAP from "../../components/map/index"

export default function Resto(props) {
    // console.log(props)
    return (
        <div style={{paddingLeft: 40, paddingRight: 40}}>
            <MyMenue/>
            <Descriptions title={props.data.name} style={{marginTop: 40}}>
                <Descriptions.Item label="description">{props.data.name}</Descriptions.Item>
                <Descriptions.Item label="description">{props.data.description}</Descriptions.Item>
                <Descriptions.Item label="adresse">{props.data.adresse}</Descriptions.Item>
                <Descriptions.Item label="category">{props.data.category.name}</Descriptions.Item>
                <Descriptions.Item label="zone">{props.data.zone.name}</Descriptions.Item>
                <Descriptions.Item label="serie">{props.data.serie.name}</Descriptions.Item>
                <Descriptions.Item label="rank"><Rate defaultValue={props.data.rank}/></Descriptions.Item>
                <Descriptions.Item label="openTime">{props.data.openTime}  </Descriptions.Item>
                <Descriptions.Item label="closeTime">{props.data.closeTime}  </Descriptions.Item>
                <Descriptions.Item label="openWeekEnd">{props.data.openWeekEnd ? 'Yes' : 'No'}  </Descriptions.Item>
            </Descriptions>
<Row>
    <Col span={12}>
        <MyMAP data={props.data} />
    </Col>
    <Col span={12}>
        <Carousel autoplay dotPosition="top">
            {props.images.map(image =>
                <Image src={"http://localhost:8080/restoJsp/api/restoImage/getImage/" + image.name}/>
            )}
        </Carousel>

    </Col>

</Row>
            {/*<iframe*/}
            {/*    src={"https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13483.507323740421!2d" + props.data.long0 + "!3d" + props.data.lat + "!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sma!4v1672259187119!5m2!1sen!2sma"}*/}
            {/*    width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy"*/}
            {/*    referrerPolicy="no-referrer-when-downgrade"/>*/}


        </div>

    )

}

export async function getServerSideProps(context) {
    const resId = context.params.id
    const res = await fetch(`http://127.0.0.1:8080/restoJsp/api/restos/` + context.params.id)
    const data = await res.json()

    const res2 = await fetch(`http://127.0.0.1:8080/restoJsp/api/restoImage/getImagesByRestoId/` + context.params.id)
    const images = await res2.json()

    // Pass data to the page via props
    return {props: {data, images}}

}

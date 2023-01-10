import Head from 'next/head'
import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Card, Col, Image, Input, Rate, Row, Select, Space, Table} from 'antd';
import Highlighter from 'react-highlight-words';
import Link from "next/link";
import MyMenue from "../components/menue";

const { Meta } = Card;

export default function Home(props) {
    console.log(props.villes)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [myData,setMyData] =useState(props.data)

    const [myVilles,setMyVilles] =useState(props.villes)
    const [myZones,setMyZones] =useState(props.zones)

    console.log(myData)
    /**selct search**/

    function getZonesData(value){
        fetch("http://127.0.0.1:8080/restoJsp/api/zones/recherche/"+value)
            .then((res) => res.json())
            .then((data) => {
                setMyZones(data)
            })

    }
    const handleProvinceChange = async (value) => {
        console.log(value)
        getZonesData(value)

    };
    const onSecondCityChange = (value) => {
        fetch("http://127.0.0.1:8080/restoJsp/api/restos/recherche/"+value)
            .then((res) => res.json())
            .then((data) => {
                setMyData(data)
            })

    };

    /***table search*/
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Address',
            dataIndex: 'adresse',
            key: 'adresse',
            ...getColumnSearchProps('adresse'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category.name'),
            sorter: (a, b) => a.category.name.length - b.category.name.length,
            sortDirections: ['descend', 'ascend'],
            render: (category) => <span>{category?.name}</span>,
        },

        {
            title: 'Zone',
            dataIndex: 'zone',
            key: 'zone',
            ...getColumnSearchProps('zone'),
            sorter: (a, b) => a.zone.length - b.zone.length,
            sortDirections: ['descend', 'ascend'],
            render: (zone) => <span>{zone?.name}</span>,

        },
        {
            title: 'Serie',
            dataIndex: 'serie',
            key: 'serie',
            ...getColumnSearchProps('serie'),
            sorter: (a, b) => a.serie.length - b.serie.length,
            sortDirections: ['descend', 'ascend'],
            render: (serie) => <span>{serie?.name}</span>,

        },

        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            ...getColumnSearchProps('rank'),
            sorter: (a, b) => a.rank.length - b.rank.length,
            sortDirections: ['descend', 'ascend'],
            render: (rank) => <Rate defaultValue={rank}/>,
        },
        {
            title: 'Image',
            dataIndex: 'coverImage',
            key: 'coverImage',
            render: (coverImage) => <Image src={"http://localhost:8080/restoJsp/api/restoImage/getImage/" + coverImage}
                                           width={100}/>,
        },

        {
            title: 'Open Time',
            dataIndex: 'openTime',
            key: 'openTime',
            ...getColumnSearchProps('openTime'),
            sorter: (a, b) => a.openTime.length - b.openTime.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Close Time',
            dataIndex: 'closeTime',
            key: 'closeTime',
            ...getColumnSearchProps('closeTime'),
            sorter: (a, b) => a.closeTime.length - b.closeTime.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Open WeekEnd',
            dataIndex: 'openWeekEnd',
            key: 'openWeekEnd',
            ...getColumnSearchProps('openWeekEnd'),
            sorter: (a, b) => a.openWeekEnd.length - b.openWeekEnd.length,
            sortDirections: ['descend', 'ascend'],
            render: (openWeekEnd) => <span>{openWeekEnd ? 'Yes' : 'No'}</span>,

        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Link href={"/resto/" + id}>Open</Link>,

        },

    ];

    return (
        <>
            <Head>
                <title>Restos</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <div style={{paddingLeft: 40, paddingRight: 40}}>
                    <MyMenue/>
                    <div style={{marginBottom:20,marginTop:50}}>
                        <span>Ville</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={handleProvinceChange}
                            options={myVilles.map((ville) => ({ label: ville.name, value: ville.id }))}
                        />
                        <span>Zone</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={onSecondCityChange}
                            options={myZones?.map((zone) => ({ label: zone.name, value: zone.id }))}
                        />

                    </div>
                    {/*<Table columns={columns} dataSource={myData} style={{marginTop:40}}*/}
                    {/*       scroll={{x: 2000}}*/}
                    {/*/>*/}
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                        {myData.map(data=>
                            <Col span={6}>

                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<Image src={"http://localhost:8080/restoJsp/api/restoImage/getImage/" + data.coverImage}
                                              />}
                            >
                                <Meta title={data.name} description={data.description} />

                                <Link href={"/resto/" + data.id}>Open</Link>
                            </Card>
                            </Col>
                        )}
                        </Row>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://127.0.0.1:8080/restoJsp/api/restos`)
    const data = await res.json()

    const res2 = await fetch(`http://127.0.0.1:8080/restoJsp/api/villes`)
    const villes = await res2.json()

    const res3 = await fetch(`http://127.0.0.1:8080/restoJsp/api/zones`)
    const zones = await res3.json()


    // Pass data to the page via props
    return {props: {data,villes,zones}}

}

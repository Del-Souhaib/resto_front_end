import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import Link from "next/link";

const items = [
    {
        label: (<Link href="/">Restos</Link>),
        key: 'restos',
        icon: <MailOutlined />,
    },

]
export default function MyMenue(){
    return (
        <Menu  mode="horizontal" items={items} />
    )
}
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import('./map'), {
    ssr: false,
})
export default MyMap
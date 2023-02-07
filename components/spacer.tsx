import React from "react";
import {NextPage} from "next";

type Props = {
    height: string;
}
const Spacer: NextPage<Props> = ({height}) => {
    return <div style={{height: height}}>&nbsp;</div>
}

export default Spacer;
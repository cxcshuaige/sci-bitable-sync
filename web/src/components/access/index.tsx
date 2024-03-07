import React, { useEffect, useState } from 'react';
import P403 from "@/pages/error/403";

const Access:React.FC<any> = (props) => {
    const { children } = props;
    const [permission, setPermission] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setPermission(true);
        }, 10);
    }, []);

    if (!permission) {
        return <P403 />;
    }

    return children   
}

export default Access;
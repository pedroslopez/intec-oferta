import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const ROUTE = API_URL + '/v1/diff';

const useChanges = (code, section) => {
    const [changes, setChanges] = useState([]);

    useEffect(() => {
        let url = ROUTE;
        if (code) {
            url += `/${code}`;

            if(section) {
                url += `/${section}`;
            }
        }

        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            if(res.success) {
                setChanges(res.changes);
            } else {
                console.error(res);
            }
        });
    }, [code, section]);

    return changes;
}

export default useChanges;
import { useState, useEffect } from 'react';

const API_URL = 'https://intec-oferta.herokuapp.com/v1/diff';

const useChanges = (code, section) => {
    const [changes, setChanges] = useState([]);

    useEffect(() => {
        let url = API_URL;
        if (code) {
            url += `/${code}`;

            if(section) {
                url += `/${section}`;
            }
        }

        const fetchChanges = () => {
            fetch(url).then(res => {
                return res.json();
            }).then(res => {
                if(res.success) {
                setChanges(res.changes);
                } else {
                console.error(res);
                }
            })
        }

        let interval = setInterval(fetchChanges, 15000);
        fetchChanges();
    
        return () => {
          clearInterval(interval);
        }
    }, [code, section]);

    return changes;
}

export default useChanges;
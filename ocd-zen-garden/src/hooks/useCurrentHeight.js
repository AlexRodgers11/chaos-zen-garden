import { useState, useEffect } from "react";

const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const useCurrentHeight = () => {
    let [height, setHeight] = useState(getHeight());

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setHeight(getHeight()), 250);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);


    return height;
}

export default useCurrentHeight;


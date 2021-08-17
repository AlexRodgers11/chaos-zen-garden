import { useState, useEffect } from "react";

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const useCurrentWidth = () => {
    let [width, setWidth] = useState(getWidth());

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWidth(getWidth()), 250);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    // useEffect(() => {
    //     let timeoutId = null;
    //     const resizeListener = () => {
    //         setWidth(getWidth())
    //     };
    //     window.addEventListener('resize', resizeListener);

    //     return () => {
    //         window.removeEventListener('resize', resizeListener);
    //     }
    // }, []);

    return width;
}

export default useCurrentWidth;


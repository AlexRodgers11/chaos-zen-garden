import { useDispatch, useSelector } from 'react-redux';

const useGardenSpecs = () => {
    const width = useSelector((state) => state.size.pieceWidth);
    const volume = useSelector((state) => state.volume.volume);
    const fullView = useSelector((state) => state.size.fullView);
    const dispatch = useDispatch();

    return [width, volume, fullView, dispatch];
}

export default useGardenSpecs;
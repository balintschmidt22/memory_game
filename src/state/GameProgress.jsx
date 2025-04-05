import { shuffle } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { getImages } from "../api/api";
import useStoredState from "../hooks/useStoredState"
import { usePairNumber } from './PairNumber'

const GameProgressContext = createContext();

function GameProgressProvider({ children }) {
    const { pairNumber } = usePairNumber();

    const [catImages, setCatImages] = useStoredState("catImages");
    const [foundIds, setFoundIds] = useStoredState("foundIds", []);
    const [firstFlipped, setFirstFlipped] = useState(null);
    const [secondFlipped, setSecondFlipped] = useState(null);

    const flip = (idx) => {
        if (firstFlipped === null) {
            setFirstFlipped(idx);
        } else if (secondFlipped === null) {
            setSecondFlipped(idx);

            if (catImages[idx].id === catImages[firstFlipped].id) {
                setFoundIds((prevState) => [...prevState, catImages[idx].id]);
                setFirstFlipped(null);
                setSecondFlipped(null);
            } else {
                setTimeout(() => {
                    setFirstFlipped(null);
                    setSecondFlipped(null);
                }, 1500);
            }
        }
    }

    const isFlipped = (idx) => {
        return [firstFlipped, secondFlipped].includes(idx) || foundIds.includes(catImages[idx].id)
    }

    useEffect(() => {
        setFoundIds([]);
        setCatImages(undefined);
        getImages(pairNumber).then((data) => setCatImages(shuffle([...data, ...data])));
    }, [pairNumber, setCatImages, setFoundIds]);

    const context = { catImages, foundIds, flip, isFlipped };

    return <GameProgressContext.Provider value={context}>{children}</GameProgressContext.Provider>
}

export default GameProgressProvider;

export const useGameProgress = () => useContext(GameProgressContext);
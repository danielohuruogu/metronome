import {useEffect, useState} from "react"
import useSound from 'use-sound'

/*
made use of package and example found here: https://reactjsexample.com/a-react-hook-for-playing-sound-effects/
made use of interval set up found here: https://tousu.in/qa/?qa=40797/
*/
const useAudio = (url, isTapTempo, tempo=null, 
    // setDisplayBPM
    ) => {

    // const audio = new Audio(url);

    const [play, {stop}] = useSound(url);

    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    const [interId, setInterId] = useState();

    // will have to find a way to get rid of existing interval when the button is clicked and play the new tempo
    // I think some kind of state management

    // it's only when isTapTempo is false and there is a tempo calculated that a new interval is set up

    useEffect(() => {
        console.log("tempo is ",tempo);
        clearInterval(interId)
        // setDisplayBPM([])
        // if play button has been clicked to toggle it on - first point of call
        if (playing) {
            if (!tempo) {
                console.log("is playing?: ",playing)
                setInterId(setInterval(()=> {
                    console.log("tick")
                    play()
                    // setDisplayBPM(displayBPM => displayBPM.concat("."))
                }, 1000))
            } else {
                // tempo is something in here
                if (!isTapTempo) {
                    setInterId(setInterval(()=>{
                        console.log("tick with tempo")
                        play()
                        // setDisplayBPM(displayBPM => displayBPM.concat("."))
                    }, tempo))
                }
                // if taptempo is true, user is choosing their tempo - change nothing
            }
        } else {
            console.log("is playing?: ",playing)
            stop();
            clearInterval(interId);
            console.log("after clearing, interval id was ",interId)
        }
    }, [playing, isTapTempo]);

    // useEffect(() => {
    //     audio.addEventListener("ended", () => setPlaying(false));
    //     return () => {
    //         audio.removeEventListener("ended", ()=> setPlaying(false));
    //     }
    // }, [])


    return [playing, toggle];
}

export default useAudio
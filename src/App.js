import './App.css';
import { useEffect, useState } from 'react';
import metronome from './metronome_sound.mp3'
import useAudio from './useAudio';

function App() {

    const [isTapTempo, setIsTapTempo] = useState(false);

    const [timeStampArr, setTimeStampArr] = useState([])

    const [tempoForMet, setTempoForMet] = useState(0);

    const [bpm, setBpm] = useState()

    // const [displayBPM, setDisplayBPM] = useState([])

    function trackTime(e) {
        if (isTapTempo) {
            console.log("trying to see time in event data")
            setTimeStampArr(timeStampArr => timeStampArr.concat(e.timeStamp));
        }
    }

    function calcTempo() {
        // will need to find average time between each click of the button
        var timeGapSum = 0;

        if (timeStampArr.length >= 4) {
            // calculate the tempo from the last 4 strikes of the button, and only the last 4 strikes
            for (let n = timeStampArr.length - 1, i = n; i >= n - 2; i--) {
                console.log("i is ", i)
                console.log(timeStampArr[i])
                var timeGap = timeStampArr[i] - timeStampArr[i-1]
                console.log("this time gap is ",timeGap)
                timeGapSum += timeGap;
            }
            // calc average using sum
            console.log("timeGapSum is ", timeGapSum)
            var timeGapAve = timeGapSum / 3;
            console.log("average time gap is ",timeGapAve)
            return timeGapAve
        }
        return null
    }

    useEffect(()=> {
        if (isTapTempo) {
            if (calcTempo() != null) {
                setTempoForMet(calcTempo())
            }
            // setIsTapTempo(true)
            console.log(tempoForMet);
        }

        setBpm(Math.round(60000/tempoForMet, 2))
    }, [isTapTempo, timeStampArr])

    const [playing, toggle] = useAudio(metronome, isTapTempo, tempoForMet, 
        // setDisplayBPM
        );

    const toggleTrack = () => setIsTapTempo(!isTapTempo)


    return (
        <div className="App">
            <h1>Metronome app</h1>
            <h3>Default is 60 BPM</h3>
            
            <div className='button-container'>
                    <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>

                    <button onClick={toggleTrack}>{isTapTempo ? "Stop" : "Set tempo"}</button>
                    {isTapTempo && 
                    (<>
                        <button onClick={trackTime}>Click</button>
                        <p>(click at least 4 times - last 4 clicks are recorded)</p>
                        <p>Hit stop when done</p>
                    </>)
                    }
            </div>
            <div className='bpm-header'>
                <p>Set BPM: {bpm === Infinity ? "0" : bpm} BPM</p>
            </div>
            {/* <div className='bpm-display'>
                <p>{displayBPM.map((item)=> item)}</p>
            </div> */}
        </div>
    );
}

export default App;

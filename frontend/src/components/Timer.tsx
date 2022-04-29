import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

type FlashcardProps = {
    isActive: boolean;
    paused: boolean;
    getTime: (seconds: number) => void;
};

const Timer: FunctionComponent<FlashcardProps> = (props) => {
    const interval = useRef<undefined | number>(undefined);
    const [seconds, setSeconds] = useState(0);
    const { isActive, getTime, paused } = props;

    function setInterval() {
        clearInterval(interval.current);
        interval.current = window.setInterval(() => {
            setSeconds((seconds) => seconds + 1);
            getTime(seconds + 1);
        }, 1000);
    }

    useEffect(() => {
        if (isActive) {
            setInterval();
        } else if (!isActive && seconds !== 0 && interval.current) {
            clearInterval(interval.current);
        }

        if (!isActive && seconds !== 0) {
            setSeconds(0);
        }
        return () => clearInterval(interval.current);
    }, [isActive, seconds, getTime]);

    useEffect(() => {
        if (paused) {
            clearInterval(interval.current);
        } else {
            setInterval();
        }
    }, [paused]);

    return (
        <div className="app">
            <div className="time">{dayjs.duration(seconds, 'seconds').format('mm:ss')}</div>
        </div>
    );
};

export default Timer;

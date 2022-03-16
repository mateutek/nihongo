import React, { FunctionComponent, useEffect, useState } from 'react';
import dayjs from 'dayjs';

type FlashcardProps = {
    isActive: boolean;
    getTime: (seconds: number) => void;
};

const Timer: FunctionComponent<FlashcardProps> = (props) => {
    const [seconds, setSeconds] = useState(0);
    const { isActive, getTime } = props;

    useEffect(() => {
        let interval: number | undefined = undefined;
        if (isActive) {
            interval = window.setInterval(() => {
                setSeconds((seconds) => seconds + 1);
                getTime(seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0 && interval) {
            clearInterval(interval);
        }

        if (!isActive && seconds !== 0) {
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, getTime]);

    return (
        <div className="app">
            <div className="time">{dayjs.duration(seconds, 'seconds').format('mm:ss')}</div>
        </div>
    );
};

export default Timer;

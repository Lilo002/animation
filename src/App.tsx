import { useEffect, useRef, useState } from 'react';

import './App.css';
import { AnimatedBlock } from './components/AnimatedBlock';
import { StaticBlock } from './components/StaticBlock';
import { Circle } from './components/Circle';
import { StartButton } from './components/StartButton';

const DISABLED_DURATION = 5;

function App() {
    const animatedBlockRef = useRef<HTMLDivElement>(null);

    const targetBlockRef = useRef<HTMLDivElement>(null);

    const [isFlying, setIsFlying] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);

    const handleStart = () => {
        setTimeLeft(DISABLED_DURATION);
        setIsFlying(true);
        setIsButtonDisabled(true);
    };

    const handleEnd = () => {
        setIsFlying(false);
    };

    useEffect(() => {
        if (!isButtonDisabled) return;

        const started = Date.now();

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - started) / 1000);

            const remaining = Math.max(0, DISABLED_DURATION - elapsed);

            setTimeLeft(remaining);

            if (remaining === 0) {
                clearInterval(interval);
                setIsButtonDisabled(false);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isButtonDisabled]);

    return (
        <div className="app">
            <div className="blocks">
                <AnimatedBlock ref={animatedBlockRef} />

                <StaticBlock ref={targetBlockRef} />
            </div>

            <StartButton disabled={isButtonDisabled} timeLeft={timeLeft} onClick={handleStart} />

            {isFlying && (
                <Circle
                    sourceRef={animatedBlockRef}
                    targetRef={targetBlockRef}
                    onFinish={handleEnd}
                />
            )}
        </div>
    );
}

export default App;

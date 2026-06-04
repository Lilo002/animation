import { useEffect, useRef, useState } from 'react';

import './index.css';

type Props = {
    sourceRef: React.RefObject<HTMLDivElement | null>;
    targetRef: React.RefObject<HTMLDivElement | null>;
    onFinish: () => void;
};

const SIZE = 100;
const DURATION = 2000;

export const Circle = ({ sourceRef, targetRef, onFinish }: Props) => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const animationRef = useRef<number>(null);

    useEffect(() => {
        const started = performance.now();

        const animate = (now: number) => {
            const progress = Math.min((now - started) / DURATION, 1);

            const source = sourceRef.current?.getBoundingClientRect();

            const target = targetRef.current?.getBoundingClientRect();

            if (!source || !target) {
                return;
            }

            const startX = source.left + source.width / 2;

            const startY = source.top + source.height / 2;

            const endX = target.left + target.width / 2;

            const endY = target.top + target.height / 2;

            const x = startX + (endX - startX) * progress;

            const y = startY + (endY - startY) * progress;

            setPosition({ x, y });

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                onFinish();
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div
            className="circle"
            style={{
                width: SIZE,
                height: SIZE,
                left: position.x,
                top: position.y,
            }}
        />
    );
};

import { forwardRef } from 'react';

import './index.css';

export const AnimatedBlock = forwardRef<HTMLDivElement>((_, ref) => {
    return <div ref={ref} className="moving-block block"></div>;
});

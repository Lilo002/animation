import { forwardRef } from 'react';

import './index.css';

export const StaticBlock = forwardRef<HTMLDivElement, object>((_, ref) => {
    return <div ref={ref} className="target-block block" />;
});

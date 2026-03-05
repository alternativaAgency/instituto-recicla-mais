import React from 'react';

type SectionDividerProps = {
    type: 'mountains' | 'curve' | 'waves';
    position: 'top' | 'bottom';
    className?: string; // height/sizing classes
    fill?: string;      // tailwind class like "fill-white", "fill-limpeza" or hex code
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
    type,
    position,
    className = "h-[50px] md:h-[100px]",
    fill = "fill-white"
}) => {
    const isTop = position === 'top';

    // For TOP-filled shapes (Curve, Mountains):
    // - Top position: top-[-1px] (hangs down)
    // - Bottom position: bottom-[-1px] rotate-180 (sits at bottom, pointing up)
    // For BOTTOM-filled shapes (Waves):
    // - Top position: top-[-1px] rotate-180 (hangs down)
    // - Bottom position: bottom-[-1px] (sits at bottom)

    const isBottomFilled = type === 'waves';

    let containerTransform = '';
    let yPosition = isTop ? 'top-[-1px]' : 'bottom-[-1px]';

    if (isBottomFilled) {
        containerTransform = isTop ? 'rotate-180' : '';
    } else {
        containerTransform = isTop ? '' : 'rotate-180';
    }

    const containerClass = `absolute left-0 w-full overflow-hidden leading-[0] z-10 ${yPosition} ${containerTransform}`;

    const svgClass = `relative block w-[calc(100%+1.3px)] ${className}`;

    const isHexOrColorName = fill.startsWith('#') || fill.startsWith('rgb') || ['white', 'black', 'transparent'].includes(fill) && !fill.includes('-');
    const pathProps = isHexOrColorName ? { fill } : { className: fill };

    const renderShape = () => {
        switch (type) {
            case 'curve':
                return (
                    <svg className={svgClass} viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            {...pathProps}
                        />
                    </svg>
                );
            case 'mountains':
                return (
                    <svg className={svgClass} viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" {...pathProps} />
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" {...pathProps} />
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" {...pathProps} />
                    </svg>
                );
            case 'waves':
                return (
                    <svg className={svgClass} viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 21.68c-120.31-7.22-297.8 44-596.53 44-245.89 0-584.28-44.59-603.47-44.59L0 120h1200V21.68z" {...pathProps} />
                        <path d="M603.47 75.68c-245.89 0-584.28-44.59-603.47-44.59L0 48.05c19.19 0 357.58 44.59 603.47 44.59 298.73 0 476.22-51.22 596.53-58.44l0-17C1079.69 24.46 902.2 75.68 603.47 75.68z" opacity=".25" {...pathProps} />
                        <path d="M379.79 93.6c-73.49-16.3-152-44.42-230-67-17.07-4.94-34.19-9.58-51.19-13.62A1017.38 1017.38 0 0 0 0 6.05v25.2h0c10.87 1.88 22 4 33.3 6.34 17.41 3.58 35.15 7.74 53.25 12.36 36.56 9.33 74.52 20.84 113.6 31.7 40.1 11.16 81 21 122.37 28.61 42.41 7.84 85.26 13.25 128.26 15.75 41.9 2.44 83.92 3.13 125.68 1.44 40.66-1.63 81-5 120.73-10 38.64-4.88 76.54-11 113.6-18.17 35-6.73 69-14.13 101.95-22 30.34-7.23 59.56-14.73 87.49-22.18 25.92-6.91 50.31-13.62 72.82-19.64A853.88 853.88 0 0 1 1200 6.05v-6h0a931.25 931.25 0 0 0-51 13.82c-23 6.17-47.88 13-74.28 20.1-28.53 7.62-58.33 15.28-89.28 22.68-33.56 8-68 15.54-103.62 22.38-37.7 7.24-76.24 13.43-115.5 18.38-40.38 5.1-81.41 8.51-122.75 10.22-42.36 1.75-85.11 1-127.76-1.54C465.71 104 422.58 98.24 379.79 93.6z" opacity=".5" {...pathProps} />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={containerClass}>
            {renderShape()}
        </div>
    );
};

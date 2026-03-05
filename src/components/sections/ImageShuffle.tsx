import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const [value, setValue] = useState<number>(() => {
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  });

  useEffect(() => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  randomizeOrder?: boolean;
  randomizeColumns?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  randomizeOrder = false,
  randomizeColumns = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [5, 4, 3],
    2
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const isMobile = useMedia(['(max-width: 600px)'], [1], 0) === 1;

  const { grid, maxHeight } = useMemo(() => {
    if (!width) return { grid: [], maxHeight: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    let itemsToProcess = isMobile ? items.slice(0, 10) : items;

    let itemsToUse: Item[];
    if (randomizeOrder) {
      // Extract original heights to preserve the pattern
      const originalHeights = itemsToProcess.map(item => item.height);
      // Shuffle the items (images/IDs)
      const shuffledItems = [...itemsToProcess].sort(() => Math.random() - 0.5);
      // Reassign heights in the original order to maintain the pattern
      itemsToUse = shuffledItems.map((item, index) => ({
        ...item,
        height: originalHeights[index]
      }));
    } else {
      itemsToUse = itemsToProcess;
    }

    const computedGrid = itemsToUse.map(child => {
      const col = randomizeColumns
        ? Math.floor(Math.random() * columns)
        : colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: computedGrid, maxHeight: Math.max(...colHeights) - gap };
  }, [columns, items, width, randomizeOrder, randomizeColumns, isMobile]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full transition-[height] duration-500 ease-out" style={{ height: maxHeight || 100 }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-linear-to-br from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Image data for the masonry layout
const imageItems: Item[] = [
  {
    id: '1',
    img: '/assets/images/18.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 300
  },
  {
    id: '2',
    img: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 400
  },
  {
    id: '3',
    img: 'https://images.pexels.com/photos/3480494/pexels-photo-3480494.jpeg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 350
  },
  {
    id: '4',
    img: 'https://images.pexels.com/photos/8926044/pexels-photo-8926044.jpeg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 280
  },

  {
    id: '5',
    img: '/assets/images/03.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 400
  },
  {
    id: '6',
    img: '/assets/images/04.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 320
  },

  {
    id: '7',
    img: 'https://images.pexels.com/photos/167538/pexels-photo-167538.jpeg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 380
  },

  {
    id: '8',
    img: '/assets/images/06.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 290
  },

  {
    id: '9',
    img: 'https://images.pexels.com/photos/5029853/pexels-photo-5029853.jpeg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 410
  },

  {
    id: '10',
    img: '/assets/images/09.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 410
  },
  {
    id: '11',
    img: '/assets/images/06.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 504
  },
  {
    id: '12',
    img: '/assets/images/18.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 464
  },
  {
    id: '13',
    img: '/assets/images/03.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 424
  },
  {
    id: '14',
    img: '/assets/images/09.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 294
  },
  {
    id: '15',
    img: '/assets/images/04.jpg',
    url: 'https://www.instagram.com/institutoreciclamais/',
    height: 294
  }
];

const ImageShuffle = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl p-0.5 mt-6 sm:mt-8">
      <div className="relative z-0 w-full overflow-hidden rounded-lg bg-limpeza p-2">
        <Masonry
          items={imageItems}
          animateFrom="bottom"
          scaleOnHover={true}
          blurToFocus={true}
          colorShiftOnHover={false}
          randomizeOrder={true}
        />
      </div>
    </div>
  );
};

export default ImageShuffle;

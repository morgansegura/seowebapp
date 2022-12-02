import { useEffect, useState } from 'react';

export default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY + 100 ? 'down' : 'up';

            if (scrollY === 0) {
                setScrollDirection(null);
            }

            if (
                direction !== scrollDirection &&
                (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
            ) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
            // console.log(lastScrollY);
        };
        document.body.addEventListener('touchmove', updateScrollDirection);
        window.addEventListener('scroll', updateScrollDirection); // add event listener
        return () => {
            document.body.removeEventListener(
                'touchmove',
                updateScrollDirection
            );
            window.removeEventListener('scroll', updateScrollDirection); // clean up
        };
    }, [scrollDirection]);

    // console.log(scrollDirection);

    return scrollDirection;
}

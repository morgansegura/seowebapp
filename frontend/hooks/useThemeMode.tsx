import { useEffect, useState } from 'react';
// [Hooks]
import { useStorage } from 'hooks';
// [Config]
import { getDefaultTheme } from '@utils/helpers';

const useThemeMode = () => {
    const { getStorage, setStorage } = useStorage();
    const { theme } = getStorage('settings')
        ? JSON.parse(getStorage('settings'))
        : { theme: getDefaultTheme() };
    const [themeMode, setThemeMode] = useState(theme);

    const getTheme = (): string => {
        const theme = themeMode;
        return theme;
    };

    const setTheme = (themeOptions: string) => {
        setStorage(
            'settings',
            JSON.stringify({
                theme: themeOptions,
            })
        );

        setThemeMode(themeOptions);
    };

    useEffect(() => {
        setTheme(themeMode);
    }, [getTheme()]);

    return { setTheme, getTheme };
};

export default useThemeMode;

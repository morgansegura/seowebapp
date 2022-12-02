import { config } from '@utils/config';

function renderGoogleFontString() {
    const {
        fonts: { array },
    } = config;

    const fontString = () => {
        const arrayMap = array.map(
            (font: string) => `family=${font.replace(' ', '+')}`
        );

        return arrayMap.join('&');
    };

    return fontString().length > 0 ? (
        <link
            href={`https://fonts.googleapis.com/css2?${fontString()}&display=optional`}
            rel="stylesheet"
        />
    ) : (
        ''
    );
}

function getDefaultTheme() {
    const { theme: themeData } = config;
    let id = '';

    Object.entries(themeData).filter(([, value]: any) => {
        if (value?.active) {
            id = value.id;
        }
    });

    return id;
}

function getThemeData(item: string, obj: boolean = false) {
    let list: any;
    let listArr: any = [];

    if (!obj) {
        Object.entries(config[`${item}`]).map(([, value]) => {
            listArr.push(value);
            list = listArr;
        });
    } else {
        list = config[`${item}`];
    }
    return list;
}

function filterObjectByString(obj: {}, filter: string) {
    const r = RegExp(`${filter}`);
    return Object.keys(obj).filter((value: any) =>
        value === r.toString().replaceAll('/', '') ? value : false
    );
}

// Returns entries from compared keys

function itemsInObjects(objA: {}, objB: {}, prefix: string) {
    const itemsArray: any = [];
    Object.keys(objA).filter((itemA: string) => {
        Object.entries(objB).filter((key: any) => {
            if (itemA.toString() === `${prefix}${key[0]}`) {
                itemsArray?.push(key[1]);
            }
        });
    });
    return itemsArray;
}

function inArray(arr: string | any[], item: any) {
    let index = arr.indexOf(item);
    return index > -1 ? true : false;
}

function inProps(obj: any, filter: string) {
    return filterObjectByString(obj, filter) ? true : false;
}

class Enum {
    constructor(...keys: any[]) {
        keys.forEach((key, i) => {
            this[key] = i;
        });
        Object.freeze(this);
    }

    *[Symbol.iterator]() {
        for (let key of Object.keys(this)) yield key;
    }
}

function syntaxHighlight(json: any) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        }
    );
}

export {
    inArray,
    filterObjectByString,
    getDefaultTheme,
    getThemeData,
    inProps,
    itemsInObjects,
    renderGoogleFontString,
    syntaxHighlight,
    Enum,
};

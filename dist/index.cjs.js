'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isBrowser = function () {
    return typeof window !== "undefined";
};

var DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
var LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
var AndroidDarkMode = "AndroidDarkMode";
function createTheme() {
    var ThemeContext = react.createContext({});
    var ThemeProvider = function (_a) {
        var _b = _a.theme, _theme = _b === void 0 ? "system" : _b, styles = _a.styles, _c = _a.onChange, onChange = _c === void 0 ? function (a) { } : _c, children = _a.children;
        var getInitialTheme = react.useCallback(function () {
            if (isBrowser()) {
                var darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
                if (_theme === "system")
                    return darkMedia.matches ? "dark" : "light";
                else
                    return theme;
            }
            else {
                return "light";
            }
        }, []);
        var isChanged = react.useRef(false);
        var _d = react.useState(getInitialTheme()), currentTheme = _d[0], _setCurrentTheme = _d[1];
        var setCurrentTheme = react.useCallback(function (newTheme) {
            isChanged.current = true;
            if (newTheme === 'system') {
                _setCurrentTheme(getInitialTheme());
            }
            else {
                _setCurrentTheme(newTheme);
            }
        }, [getInitialTheme]);
        var updateInitialTheme = react.useCallback(function () {
            setCurrentTheme(getInitialTheme());
        }, [setCurrentTheme, getInitialTheme]);
        react.useEffect(function () {
            if (isBrowser()) {
                if (!isChanged.current) {
                    updateInitialTheme();
                }
            }
        }, [isChanged.current, updateInitialTheme]);
        var getCurrentTheme = react.useCallback(function (e) {
            var userAgent = window.navigator.userAgent;
            if (userAgent.includes(AndroidDarkMode)) {
                setCurrentTheme('dark');
                onChange('dark');
            }
            else if (e && e.matches) {
                if (e.media === DARK_MEDIA_QUERY) {
                    setCurrentTheme('dark');
                    onChange('dark');
                }
                else {
                    setCurrentTheme('light');
                    onChange('light');
                }
            }
        }, [onChange]);
        react.useEffect(function () {
            var darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
            var lightMedia = window.matchMedia(LIGHT_MEDIA_QUERY);
            if (_theme === "system") {
                if (darkMedia.addEventListener) {
                    darkMedia.addEventListener("change", getCurrentTheme);
                    lightMedia.addEventListener("change", getCurrentTheme);
                }
                else if (darkMedia.addListener) {
                    darkMedia.addListener(getCurrentTheme);
                    lightMedia.addListener(getCurrentTheme);
                }
            }
            else {
                setCurrentTheme(_theme);
            }
            return function () {
                if (darkMedia.removeEventListener) {
                    darkMedia.removeEventListener("change", getCurrentTheme);
                    lightMedia.removeEventListener("change", getCurrentTheme);
                }
                else if (darkMedia.removeListener) {
                    darkMedia.removeListener(getCurrentTheme);
                    lightMedia.removeListener(getCurrentTheme);
                }
            };
        }, [_theme, getCurrentTheme]);
        var theme = styles[currentTheme];
        var value = { theme: theme, current: currentTheme, setCurrentTheme: setCurrentTheme };
        return (jsxRuntime.jsx(ThemeContext.Provider, __assign({ value: value }, { children: children }), void 0));
    };
    var useTheme = function () {
        var context = react.useContext(ThemeContext);
        if (context === undefined) {
            throw new Error('useThemeContext must be used within an ThemeProvider');
        }
        return context;
    };
    return {
        ThemeProvider: ThemeProvider,
        useTheme: useTheme
    };
}

exports.createTheme = createTheme;

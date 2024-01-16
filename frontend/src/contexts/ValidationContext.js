import React, { createContext } from 'react';

export const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
    const isValidCI = (ci) => {
        if (typeof ci !== 'string' && typeof ci !== 'number') {
            throw new Error("Invalid input type. CI should be a string or a number.");
        }
        if (typeof ci === 'number') {
            ci = ci.toString();
        }
        if (!/^\d+$/.test(ci)) {
            throw new Error("CI should onlDy contain digits.");
        }
        if (ci.length !== 10) {
            throw new Error("CI should be 10 digits long.");
        }

        return isChecksumValid(ci);
    };

    const isChecksumValid = (ci) => {
        let total = 0;

        for (let position = 0; position < 9; position++) {
            let digit = parseInt(ci.charAt(position), 10);

            if (position % 2 === 0) {
                digit = digit * 2;
                if (digit > 9) {
                    digit = (digit % 10) + 1;
                }
            }

            total += digit;
        }

        let lastDigit = parseInt(ci.charAt(9), 10);
        let calculatedDigit = (total % 10 === 0) ? 0 : 10 - (total % 10);

        return lastDigit === calculatedDigit;
    };

    return (
        <ValidationContext.Provider value={{ isValidCI }}>
            {children}
        </ValidationContext.Provider>
    );
};


//! validateCI.js
//! version : 1.0.0
//! author : Insoutt
//! license : MIT
//! https://github.com/insoutt
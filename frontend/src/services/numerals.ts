import { Exceptions, Numerals, Numeric, Systems } from './numeralTypes';

function hashKeys(obj: Numerals) {
    const keys = [];
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

function hashKeysNumerical(obj: Numerals) {
    let keys = hashKeys(obj);
    let map = keys.map(function (numeral) {
        return +numeral;
    });
    map = map.sort(function (a, b) {
        return a - b;
    });
    return map;
}

function findClosestNumeral(numerals: Numerals, number: number) {
    let key: number = 0;
    let keys = hashKeysNumerical(numerals);
    for (let i = keys.length - 1; i >= 0; i--) {
        key = keys[i];
        if (key <= number) {
            break;
        }
    }
    return key;
}

function findException(exceptions: Exceptions | undefined, number: number) {
    if (exceptions) {
        return exceptions[number];
    } else {
        return undefined;
    }
}

function Convert(
    numerals: Numerals,
    minus: string,
    point: string,
    exceptions: Exceptions | undefined,
    number: number,
    res?: string,
) {
    let result = '';
    const closest = findClosestNumeral(numerals, number);
    if (closest === number) {
        result += numerals[closest];
        return result;
    }
    var multiple = 1;
    while ((multiple + 1) * closest <= number) multiple++;

    var sub = closest * multiple;
    number -= sub;
    var exception = findException(exceptions, sub);
    if (exception) {
        result += exception;
    } else if (1 !== multiple) {
        result += Convert(numerals, minus, point, exceptions, multiple, result);
    }

    if (!exception) {
        result += numerals[closest];
    }

    if (0 !== number) {
        result += ' ';
        result += Convert(numerals, minus, point, exceptions, number, result);
    }
    return result;
}

function convertNumber(system: Systems, number: string) {
    if (!Numeric[system]) return 'Unsupported number system';

    const snumber = number;
    let parsedNumber = +number;
    if (isNaN(parsedNumber)) return 'Input is not numeric';

    let result = '';

    const sys = Numeric[system];
    const numerals = sys['Numerals'];
    const minus = sys['Minus'];
    const point = sys['Point'];
    const exceptions = sys['Exceptions'];

    if (parsedNumber < 0) result = minus + ' ';

    parsedNumber = Math.abs(parsedNumber);
    const decimal = snumber.indexOf('.');
    if (decimal !== -1) {
        var first = snumber.substring(0, decimal);
        var second = snumber.substring(decimal + 1);
        result += Convert(numerals, minus, point, exceptions, Math.abs(+first), '0');
        result += ' ' + point + ' ';
        for (let i = 0; i < second.length; i += 1) {
            var digit = +second.substring(i, i + 1);
            result += Convert(numerals, minus, point, exceptions, digit, '0');
            result += ' ';
        }
        result = result.trim();
    } else {
        result += Convert(numerals, minus, point, exceptions, Math.abs(parsedNumber), '0');
    }

    return result;
}

export default convertNumber;

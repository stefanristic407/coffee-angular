import * as _ from 'lodash';

export function toCamelCase<T>(dto: any): T {
    if (_.isPlainObject(dto)) {
        return Object.keys(dto).reduce(
            (result, key) => ({
                ...result,
                [_.camelCase(key)]: toCamelCase(dto[key]),
            }),
            {},
        ) as T;
    }

    return dto as T;
}

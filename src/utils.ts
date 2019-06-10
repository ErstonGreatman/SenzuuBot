/**
 * 
 * @param toArray - String to split into an array of strings
 * @param delimiter - Delimiter that string will be split using. Default: ','
 */
export const stringToArray = (toArray: string, delimiter?: string) => (toArray || '').split(delimiter || ',');
export const generateImageUrl = (host: string, measure_uuid: string) =>
  `http://${host}/images/${measure_uuid}.jpeg`;

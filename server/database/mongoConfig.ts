import config from "@config";

const getMongoUrl = () => {
    const { mongoUri, mongoPort, mongoDbName } = config()
    const options = '?readPreferences=secondary';
    return `mongodb://${mongoUri}:${mongoPort}/${mongoDbName}${options}`;
}

export default getMongoUrl;

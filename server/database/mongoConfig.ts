import config from "@config";

const getMongoUrl = () => {
    const { mongoUser, mongoPassword, mongoUri, mongoPort, mongoDbName } = config();
    const options = '?authSource=admin';
    return `mongodb://${mongoUser}:${mongoPassword}@${mongoUri}:${mongoPort}/${mongoDbName}${options}`;
}

export default getMongoUrl;

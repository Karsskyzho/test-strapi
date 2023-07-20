module.exports = ({ env }) => {
    return {
        upload: {
            config: {
                provider: 'aws-s3',
                providerOptions: {
                    accessKeyId: env('CELLAR_ADDON_KEY_ID'),
                    secretAccessKey: env('CELLAR_ADDON_KEY_SECRET'),
                    endpoint: env('CELLAR_ADDON_HOST'),
                    params: {
                        Bucket: env('CELLAR_ADDON_BUCKET'),
                    },
                },
            },
        }
    }
};
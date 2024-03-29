const { login, LoginBody } = require('./endpoints/auth')
const { postTents, TentsBody, EmptyFile, CsvHeaders, NoFile } = require('./endpoints/tent')

exports.apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Tent-Booking-App API  Documentation',
        description: '',
        contact: {
            name: 'khalil meziane',
            email: 'khalilmez2000@@gmail.com'
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development Server'
            }
        ],
        tags: [
            {
                name: 'Auth'
            },
            {
                name: 'Tent'
            }
        ]
    },
    paths: {
        '/api/auth/login': {
            post: login
        },
        '/api/tent': {
            post: postTents
        }
    },
    components: {
        schemas: {
            LoginBody,
            TentsBody,
            EmptyFile,
            CsvHeaders,
            NoFile
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
}

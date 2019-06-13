module.exports = {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: 'false',
                },
            ],
        ],
        env: {
            cjs: {
                presets: [
                    [
                        '@babel/env',
                        {
                            targets: {
                                node: 8,
                            },
                        },
                    ],
                ]
            }
        },
}

